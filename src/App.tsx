import { Fragment, useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routers";
import DefaultLayout from "./routers/components/DefaultLayout";
import { auth } from "./firebase/config";
import { v4 } from "uuid";
import PrivateRoute from "./routers/PrivateRoute";
import { useAppDispatch, useAppSelector } from "./shared/hooks";
import profileStore from "./modules/authentication/profileStore";
import { onAuthStateChanged } from "firebase/auth";

const getTokenFirebase = () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return currentUser?.getIdToken();
  }
  if (!localStorage.getItem("auth-token")) {
    return null;
  }
  return new Promise((resole, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
      console.log("Reject timeout");
    }, 10000);
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      if (user) {
        resole(user.getIdToken());
      } else {
        reject(null);
      }
      unregisterAuthObserver();
      clearTimeout(waitTimer);
    });
  });
};
function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let token = getTokenFirebase();
  if (!token) {
    dispatch(profileStore.actions.logOut());
    localStorage.removeItem("auth-token");
    navigate("/login");
  }
  const listPermissionCode =
    useAppSelector((state) => state.profile.listPermissionCode) || [];
  return (
    <div className="App">
      <Routes>
        {!token ? (
          <>
            {publicRoutes?.map((value) => {
              let Layout = Fragment;
              return (
                <Route
                  key={v4()}
                  element={<Layout>{value?.component}</Layout>}
                  path={value?.path}
                >
                  {value?.children
                    ? value?.children.map((item) => (
                        <Route
                          key={v4()}
                          path={item.path}
                          element={item.component}
                        />
                      ))
                    : null}
                </Route>
              );
            })}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {privateRoutes?.map((value) => {
              let Layout = DefaultLayout;

              return (
                <Route
                  key={v4()}
                  element={
                    <PrivateRoute
                      component={
                        <Layout dashboard={value.path === "/"}>
                          {value?.component}
                        </Layout>
                      }
                    ></PrivateRoute>
                  }
                  path={value?.path}
                >
                  {value?.children
                    ? value?.children.map((item) => {
                        if (!item.permisioncode) {
                          return (
                            <Route
                              key={v4()}
                              path={item.path}
                              element={item.component}
                            />
                          );
                        }

                        if (
                          item.permisioncode &&
                          listPermissionCode?.find(
                            (i) => item.permisioncode === i
                          )
                        ) {
                          return (
                            <Route
                              key={v4()}
                              path={item.path}
                              element={item.component}
                            />
                          );
                        }
                      })
                    : null}
                </Route>
              );
            })}
            <Route path="*" element={<Navigate to="/record-store" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

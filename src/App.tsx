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
import { logout } from "./modules/authentication/repository";
import profileStore from "./modules/authentication/profileStore";
import { publicToast } from "./shared/components/Toast";

function App() {
  const token = localStorage.getItem("auth-token");
  const dispatch = useAppDispatch();
  console.log(auth.currentUser, ["auth"]);

  if (token && auth?.currentUser && auth?.currentUser?.refreshToken !== token) {
    logout()
      .then(() => {
        dispatch(profileStore.actions.logOut());
        navigate("/login");
      })
      .catch(() => {
        publicToast({
          type: "error",
          description: "Có lỗi xảy ra",
          message: "Đăng xuất thất bại",
        });
      });
  }

  const navigate = useNavigate();
  const listPermissionCode =
    useAppSelector((state) => state.profile.listPermissionCode) || [];
  // useEffect(() => {
  //   const unsubscibed = auth.onAuthStateChanged((userCurrent) => {
  //     if (userCurrent) {
  //       setUser(userCurrent);
  //       return;
  //     } else {
  //     }
  //     setUser(undefined);
  //   });
  //   return () => {
  //     unsubscibed();
  //   };
  // }, [history]);

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

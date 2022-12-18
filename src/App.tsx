import { Fragment, useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routers";
import DefaultLayout from "./routers/components/DefaultLayout";
import { auth } from "./firebase/config";
import { v4 } from "uuid";
import PrivateRoute from "./routers/PrivateRoute";
import { useAppSelector } from "./shared/hooks";

function App() {
  const [user, setUser] = useState<object | undefined>();
  const history = useNavigate();
  const listPermissionCode =
    useAppSelector((state) => state.profile.listPermissionCode) || [];

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((userCurrent) => {
      if (userCurrent) {
        setUser(userCurrent);
        return;
      }
      setUser(undefined);
    });
    return () => {
      unsubscibed();
    };
  }, [history]);

  return (
    <div className="App">
      <Routes>
        {user ? (
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

            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;

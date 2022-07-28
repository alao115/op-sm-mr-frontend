import React, { useState, useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./layout-components/header/Header";
import Sidebar from "./layout-components/sidebar/Sidebar";
// import Footer from "./layout-components/footer/Footer";
// import Customizer from "./layout-components/customizer/Customizer";

import userRoutes from "../routes/Router";
import adminRoutes from "../routes/AdminRouter";
import superAdminRoutes from "../routes/SuperAdminRouter";
// import routes from "../routes/Router"

import Spinner from "./../views/spinner/Spinner";
import useAuth from "../hooks/useAuth";
export default function FullLayout(props) {
  const { authUser } = useAuth((ctx) => ctx);

  // const [routes, setThemeRoutes] = useState(userRoutes)
  const [routes, setThemeRoutes] = useState(superAdminRoutes);

  useEffect(() => {
    if (authUser) {
      switch (authUser.role) {
        case "superadmin":
          setThemeRoutes(superAdminRoutes);
          break;
        case "admin":
          setThemeRoutes(adminRoutes);
          break;
        default:
          setThemeRoutes(userRoutes);
          break;
      }
    }
  }, [routes, authUser]);

  const [width, setWidth] = useState(window.innerWidth);

  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    const updateDimensions = () => {
      let element = document.getElementById("main-wrapper");
      setWidth(window.innerWidth);
      switch (settings.activeSidebarType) {
        case "full":
        case "iconbar":
          if (width < 1170) {
            element.setAttribute("data-sidebartype", "mini-sidebar");
            element.classList.add("mini-sidebar");
          } else {
            element.setAttribute(
              "data-sidebartype",
              settings.activeSidebarType
            );
            element.classList.remove("mini-sidebar");
          }
          break;

        case "overlay":
          if (width < 767) {
            element.setAttribute("data-sidebartype", "mini-sidebar");
          } else {
            element.setAttribute(
              "data-sidebartype",
              settings.activeSidebarType
            );
          }
          break;

        default:
      }
    };
    if (document.readyState === "complete") {
      updateDimensions();
    }
    window.addEventListener("load", updateDimensions.bind(null));
    window.addEventListener("resize", updateDimensions.bind(null));
    return () => {
      window.removeEventListener("load", updateDimensions.bind(null));
      window.removeEventListener("resize", updateDimensions.bind(null));
    };
  }, [settings.activeSidebarType, width]);

  // console.log(routes)
  return (
    <div
      id="main-wrapper"
      dir={settings.activeDir}
      data-theme={settings.activeTheme}
      data-layout={settings.activeThemeLayout}
      data-sidebartype={settings.activeSidebarType}
      data-sidebar-position={settings.activeSidebarPos}
      data-header-position={settings.activeHeaderPos}
      data-boxed-layout={settings.activeLayout}
    >
      {/*--------------------------------------------------------------------------------*/}
      {/* Header                                                                         */}
      {/*--------------------------------------------------------------------------------*/}
      <Header />
      {/*--------------------------------------------------------------------------------*/}
      {/* Sidebar                                                                        */}
      {/*--------------------------------------------------------------------------------*/}
      <Sidebar {...props} routes={routes} />
      {/*--------------------------------------------------------------------------------*/}
      {/* Page Main-Content                                                              */}
      {/*--------------------------------------------------------------------------------*/}
      <div className="page-wrapper d-block">
        <div className="page-content container-fluid relative">
          <Suspense fallback={<Spinner />}>
            <Routes>
              {routes.map((prop, key) => {
                if (prop.navlabel) {
                  // return
                  // return <Route key={key}  path="/dashboards" children={() => <Navigate to="/dashboards" /> } />
                  // continue
                  return null;
                } else if (prop.collapse) {
                  return prop.child.map((prop2, key2) => {
                    // console.log(prop2)
                    const { component: Component2, layout, children } = prop2;
                    if (prop2.collapse) {
                      return prop2.subchild.map((prop3, key3) => {
                        const { component: Component3 } = prop3;
                        return (
                          <Route
                            path={prop3.path}
                            element={<Component3 />}
                            key={key3}
                          />
                        );
                      });
                    }

                    if (layout) {
                      return (
                        <Route key={key2} path={prop2.path} element={<Component2 />}>
                          {
                            children.map((prop3, key3) => {
                              const { component: Component3 } = prop3;
                              return (
                                key3 === 0 ? <Route index key={key3} element={<Component3 />} /> : <Route key={key3} path={prop3.path} element={<Component3 />} />
                              )
                            })
                          }
                        </Route>
                      );
                    }

                    return (
                      <Route
                        path={prop2.path}
                        element={<Component2 />}
                        key={key2}
                      />
                    );
                  });
                } else if (prop.redirect) {
                  return (
                    <Route
                      index
                      key={key}
                      element={<Navigate from={prop.path} to={prop.pathTo} />}
                    />
                  );
                } else {
                  const { component: Component } = prop;
                  return (
                    <Route path={prop.path} element={<Component />} key={key} />
                  );
                }
              })}
            </Routes>
          </Suspense>
        </div>
        {/* <Footer /> */}
      </div>
      {/*--------------------------------------------------------------------------------*/}
      {/* Customizer from which you can set all the Layout Settings                      */}
      {/*--------------------------------------------------------------------------------*/}
      {/* <Customizer /> */}
    </div>
  );
}

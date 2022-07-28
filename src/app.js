import React from "react";
import indexRoutes from "./routes/";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/Store";
import BlankLayout from "./layouts/BlankLayout";
import { ToastProvider } from "react-toast-notifications";
import AuthContextProvider from "./redux/authContext";
import PrivateComp from "./routes/PrivateComp";

const App = () => {
  return (
    <div className="">
      <ToastProvider>
        <Provider store={configureStore()}>
          <AuthContextProvider>
            <BrowserRouter>
              <Routes>
                {indexRoutes.map((prop, key) => {
                  return (
                    <Route
                      key={key}
                      path={prop.path}
                      element={<PrivateComp component={prop.component} />}
                    />
                  );
                })}
                <Route path="/authentication/*" element={<BlankLayout />} />
                <Route path="*" element={<Navigate to="/dashboards" />} />
              </Routes>
            </BrowserRouter>
          </AuthContextProvider>
        </Provider>
      </ToastProvider>
    </div>
  );
};
export default App;

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthRoutes from "../routes/AuthRoutes.js";

const BlankLayout = () => {
  
  return (
    <div className="authentications">
      <Routes>
        {AuthRoutes.map((prop, key) => {
          const { component: Component } = prop
          if (prop.redirect)
            return <Navigate from={prop.path} to={prop.pathTo} key={key} />;
          return (
            <Route path={prop.path} element={ <Component /> } key={key} />
          );
        })}
      </Routes>
    </div>
  );
};
export default BlankLayout;

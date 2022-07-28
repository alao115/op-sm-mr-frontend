import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Spinner from "./views/spinner/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/index.css"
import "./assets/scss/style.scss"

const App = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import("./app")), 0);
    })
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Spinner />}>
    <React.StrictMode>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </React.StrictMode>
  </Suspense>
);

import { lazy } from "react";
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const BlankLayout = lazy(() => import("../layouts/BlankLayout.js"));
// import FullLayout from "../layouts/FullLayout"
// import BlankLayout from "../layouts/BlankLayout"

const indexRoutes = [
  { path: "/authentication", name: "Athentication", component: BlankLayout },
  { path: "/*", name: "Dashboard", component: FullLayout },
];

export default indexRoutes;

import { lazy } from "react"
// const Login2 = lazy(() => (import('../views/authentication/Login2')));
const Register = lazy(() => (import('../views/authentication/Register')));
// const Register2 = lazy(() => (import('../views/authentication/Register2')));
// const Lockscreen = lazy(() => (import('../views/authentication/LockScreen')));
const Recoverpwd = lazy(() => (import('../views/authentication/RecoverPwd')));
const Maintanance = lazy(() => (import('../views/authentication/Maintanance')));
const Login = lazy(() => (import("../views/authentication/Login")));

var AuthRoutes = [
    { path: 'login', name: 'Login', icon: 'mdi mdi-account-key', component: Login },
    // { path: '/authentication/Login2', name: 'Login with Firebase', icon: 'mdi mdi-account-key', component: Login2 },
    { path: 'register', name: 'Register', icon: 'mdi mdi-account-plus', component: Register },
    // { path: '/authentication/Register2', name: 'Register with Firebase', icon: 'mdi mdi-account-plus', component: Register2 },
    // { path: '/authentication/LockScreen', name: 'Lockscreen', icon: 'mdi mdi-account-off', component: Lockscreen },
    { path: 'recoverPwd', name: 'Recover Password', icon: 'mdi mdi-account-convert', component: Recoverpwd },
    { path: 'maintanance', name: 'Maintanance', icon: 'mdi mdi-pencil-box-outline', component: Maintanance }
];
export default AuthRoutes; 
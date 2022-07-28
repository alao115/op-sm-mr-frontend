import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateComp = (props) => {
  const { component: Component, compProp } = props;
  const { isLoggedIn } = useAuth((ctx) => ctx);

  const location = useLocation();

  if (!isLoggedIn) {
    // not logged in so redirect to login page with the return url
    return location.pathname.startsWith("/authentication") ? (
      <Component {...compProp} />
    ) : (
      <Navigate to="/authentication/login" state={{ from: props.location }} />
    );
  }

  if (location.pathname === "/authentication/login") {
    return (
      <Navigate to="/" state={{ from: props.location }} />
    );
  }
  // authorised so return component
  return <Component {...compProp} />;
};

export default PrivateComp;

import { useContext } from "react";

import { AuthContext } from "../redux/authContext";

export default function useAuth(fn) {
  const authCtx = useContext(AuthContext);

  return fn(authCtx);
}

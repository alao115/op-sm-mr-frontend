import { BehaviorSubject } from "rxjs";

import { HandleResponse } from "../_helpers";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

const loginToken = new BehaviorSubject(
  // JSON.parse(localStorage.getItem("miriaa-token"))
);

export const AuthenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  token: loginToken,
  get currentUserValue() {
    return currentUserSubject.value;
  },
  get tokenValue() {
    return loginToken.value;
  }
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`/users/authenticate`, requestOptions)
    .then(HandleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
  localStorage.removeItem("miriaa-token");
  loginToken.next(null);
  return Promise.resolve()
}

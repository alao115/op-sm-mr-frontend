import moment from 'moment'
import React, { useState, useEffect } from "react";
import { useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useToasts } from 'react-toast-notifications';

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  loginFn: (token) => {},
  logoutFn: () => {},
	authUser: null
});

export default function AuthContextFn (props) {
	const tokenValue = localStorage.getItem('miriaa-token')
  const refreshTokenValue = localStorage.getItem('miriaa-refreshToken')
	const expireInValue = localStorage.getItem('miriaa-expiresIn')
  const [token, setToken] = useState(tokenValue || "");
  const [refreshToken, setRefreshToken] = useState(refreshTokenValue || "")
  const [expireIn, setExpireIn] = useState(expireInValue || 0);
	const [authUser, setAuthUser] = useState(null); 
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  const loginFn = useCallback(({ accessToken, refreshToken, expiresIn }) => {
    return $api.authService.getAuthUser(accessToken)
        .then(({ data }) => {
          if(!data.data.user.isActivated) {
            throw new Error("Votre compte n'est activé. Veuillez-vous rapprocher de l'administrateur")
            // addToast($message({ header: 'Authentification', message: "Votre compte n'est activé. Veuillez-vous rapprocher de l'administrateur" }), { appearance: 'error', autoDismiss: true })
            // logoutFn()
          }
					setAuthUser(data.data.user)
          setToken(accessToken)
          setRefreshToken(refreshToken)
          setExpireIn(expiresIn)
          localStorage.setItem("miriaa-token", accessToken)
          localStorage.setItem("miriaa-refreshToken", refreshToken)
          localStorage.setItem('miriaa-expiresIn', expiresIn)
        }).catch(err => {
        	const message = err?.response?.data.error.message || err.message;
        	addToast($message({ header: '', message }), { appearance: 'error', autoDismiss: true })
					logoutFn()
				})
  },[$api.authService, $message, addToast]);

  const logoutFn = () => {
    setToken("");
    setRefreshToken("");
    setExpireIn(0);
		localStorage.removeItem('miriaa-token');
		localStorage.removeItem('miriaa-refreshToken');
		localStorage.removeItem('miriaa-expiresIn');
		return Promise.resolve()
  };

  const refreshTokenFn = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('miriaa-refreshToken')
      const response = await $api.authService.refreshToken({ 'refresh-token': refreshToken })
      loginFn(response.data.data)
    } catch (error) {
        addToast($message({ header: 'Token expired', message: 'Votre token est expiré' }), { appearance: 'error', autoDismiss: true })
				logoutFn()
    }
  }, [$api.authService, $message, addToast, loginFn])

  useEffect(() => {
    if(expireIn > 0) {
			const remainingTime = (+expireIn) - (+moment().unix())
			setTimeout(() => {
        refreshTokenFn()
			}, remainingTime * 1000)
		}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [$message, addToast, expireIn, refreshToken, refreshTokenFn])


  const initialState = {
    token,
    isLoggedIn: !!token,
    loginFn,
    logoutFn,
		authUser
  };

  return (
    <AuthContext.Provider value={initialState}>
      {props.children}
    </AuthContext.Provider>
  );
};

import moment from 'moment'
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
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
	const expireInValue = localStorage.getItem('miriaa-expiresIn')
  const [token, setToken] = useState((tokenValue ? JSON.parse(tokenValue) : null));
  const [expireIn, setExpireIn] = useState((expireInValue ? JSON.parse(expireInValue) : null));
	const [authUser, setAuthUser] = useState(null); 
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()
  const dispatch = useDispatch()

  const isLoggedIn = !!token;

  const loginFn = (token, expireIn) => {
    setToken(token);
		setExpireIn(expireIn)
  	localStorage.setItem("miriaa-token", JSON.stringify(token));
		localStorage.setItem('miriaa-expiresIn', JSON.stringify(expireIn))
  };

  const logoutFn = () => {
    setToken(null);
		localStorage.removeItem('miriaa-token');
		localStorage.removeItem('miriaa-expiresIn');
		return Promise.resolve()
  };

	useEffect(() => {
		if(expireIn > 0) {
			const remainingTime = (+expireIn) - (+moment().unix())
			setTimeout(() => {
        addToast($message({ header: 'Token expired', message: 'Votre token est expiré' }), { appearance: 'error', autoDismiss: true })
				logoutFn()
			}, remainingTime * 1000)
		}
	}, [$message, addToast, expireIn])

  useEffect(() => {
    if (token) {
      $api.authService.getAuthUser(token)
        .then(({ data }) => {

          if(!data.data.user.isActivated) {
            addToast($message({ header: 'Authentification', message: "Votre compte n'est activé. Veuillez-vous rapprocher de l'administrateur" }), { appearance: 'error', autoDismiss: true })
            logoutFn()
            // return <Redirect to={{ pathname: "/authentication/Login", state: { from: props.location }, }} />
          }

					setAuthUser(data.data.user)

        }).catch(err => {
        	const message = err?.response?.data.error.message || err.message;
        	addToast($message({ header: '', message }), { appearance: 'error', autoDismiss: true })
					logoutFn()
				})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [$api.authService, token, dispatch, addToast])


  const initialState = {
    token,
    isLoggedIn,
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

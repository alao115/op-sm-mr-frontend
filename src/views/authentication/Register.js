import React, { useEffect, useReducer, useState } from "react";
import {
  Input,
  FormGroup,
  Form,
  Row,
  Col,
  Button,
	Spinner
} from "reactstrap";

import { useSelector } from "react-redux";
import { useToasts } from 'react-toast-notifications'

import img1 from "../../assets/images/logo-icon.png";
import img2 from "../../assets/images/background/login-register.jpg";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom center",
};

const Register = () => {
	const { $api, $message } = useSelector(state => state)
	const [onSignup, setOnSignup] = useState(false)
	const { addToast } = useToasts()

  // useEffect(() => {})

	function signupReducer (state, { type, value }) {
		switch (type) {
			case 'setName':
				return { ...state, name: value }
			case 'setEmail':
				return { ...state, email: value }
			case 'setPassword':
				return { ...state, password: value }
			default: return { ...state }
		}
	}

	const [signupData, signupDispatch] = useReducer(signupReducer, { name: '', email: '', password: '' })

	async function signup(e) {
		e.preventDefault()

		try {
			setOnSignup(true)

			const response = await $api.authService.signup(signupData)
			console.log(response)
      signupDispatch({ type: 'setName', value: '' })
      signupDispatch({ type: 'setEmail', value: '' })
      signupDispatch({ type: 'setPassword', value: '' })
      window.location = '/authentication/login'

			setOnSignup(false)
		} catch (error) {
			setOnSignup(false)
			addToast($message({ header: 'Signup', message: error?.response?.data.error.message || error.message }), { appearance: 'error', autoDismiss: true })
		}
	}

  return (
    <div className="">
      {/*--------------------------------------------------------------------------------*/}
      {/*Register Cards*/}
      {/*--------------------------------------------------------------------------------*/}
      <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={sidebarBackground}>
        <div className="auth-box on-sidebar">
          <div id="loginform">
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" />
              </span>
              <h5 className="font-medium mb-3">Créer un compte sur le tableau de bord</h5>
            </div>
            <Row>
              <Col xs="12">
                <Form className="mt-3" id="loginform" onSubmit={ signup }>
                  <FormGroup className="mb-3">
                    <Input type="text" name="uname" id="uname" placeholder="Entez un nom (Ex: Paul ASSOGBA)" bsSize="lg" onChange={ (e) => signupDispatch({ type: 'setName', value: e.target.value }) } required />
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <Input type="email" name="email" id="email" placeholder="Entrez un email (Ex: paul.assogba@sonama.bj)" bsSize="lg" onChange={ (e) => signupDispatch({ type: 'setEmail', value: e.target.value }) } required />
                  </FormGroup>
                  <FormGroup className="mb-3">
                    <Input type="password" name="password" id="password" placeholder="Entrez un mot de passe à 8 caractères" bsSize="lg" onChange={ (e) => signupDispatch({ type: 'setPassword', value: e.target.value }) } required />
                  </FormGroup>
                  {/* <CustomInput type="checkbox" id="exampleCustomCheckbox" label="I agree to all Terms" /> */}
                  <Row className="mb-3 mt-3">
                    <Col xs="12">
                      <Button color="primary" size="lg" className="text-uppercase" type="submit" disabled={ !signupData.name || !signupData.email || !signupData.password } block >
                        Créer maintenant
												{ onSignup && <Spinner className="ml-2" size="md"></Spinner>}
                      </Button>
                    </Col>
                  </Row>
                  <div className="text-center">
                    Avez-vous déjà un compte?{" "}
                    <a href="/authentication/login" className="text-info ml-1">
                      <b>Se connecter</b>
                    </a>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

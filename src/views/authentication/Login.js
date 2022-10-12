import React, { useState } from "react";
import {
  InputGroupText,
  Row,
  Col,
} from "reactstrap";
import img1 from "../../assets/images/logo-icon.png";
import img2 from "../../assets/images/background/login-register.jpg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom'
import { CustomTextInput } from '../../components/forms/customInputs'

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom center",
};

const Login = (props) => {
  const { $api } = useSelector(state => state)
  // const dispatch = useDispatch()
  const { loginFn } = useAuth(ctx => ctx)
  const location = useLocation()
  const navigate = useNavigate()
  const [isSubmitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState('')
  return (
    <div className="">
      {/*--------------------------------------------------------------------------------*/}
      {/*Login Cards*/}
      {/*--------------------------------------------------------------------------------*/}
      <div
        className="auth-wrapper d-flex no-block justify-content-center align-items-center"
        style={sidebarBackground}
      >
        <div className="auth-box on-sidebar">
          <div id="loginform">
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" />
              </span>
              <h5 className="font-medium mb-3">Se connecter au Tableau de bord</h5>
            </div>
            <Row>
              <Col xs="12">
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().required("Email is required"),
                    password: Yup.string().required("Password is required"),
                  })}
                  onSubmit={({ username, password }, ) => {
                    setStatus();
                    $api.authService.signin({ email: username, password }).then(
                      (response) => {
                        loginFn(response.data.data)
                          .then(() => {
                            const { from } = location.state || { from: { pathname: "/" } };
                            navigate((from || {pathname: "/"}));
                          })
                      },
                      (error) => {
                        setSubmitting(false);
                        setStatus(error?.response?.data.error.message || error.message);
                      }
                    );
                  }}>
                    <Form className="mt-3" id="loginform">
                      <div className="flex w-full mb-2">
                        <InputGroupText className='rounded-r-none'>
                          <i className="ti-user"></i>
                        </InputGroupText>
                        <CustomTextInput className="w-full" innerInputClassName="rounded-l-none border-l-0" name="username" type="text" placeholder="Email" />
                      </div>
                      <div className="w-full flex mb-2">
                        <InputGroupText className='rounded-r-none'>
                          <i className="ti-lock"></i>
                        </InputGroupText>
                        <CustomTextInput className='w-11/12' innerInputClassName="rounded-l-none border-l-0" name="password" type="password" placeholder="Mot de passe" />
                      </div>
                      <Row className="mb-3 mt-4">
                        <Col xs="12">
                          <button
                            type="submit"
                            className="btn btn-block btn-primary"
                            disabled={isSubmitting}
                          >
                            Se Connecter
                          </button>
                        </Col>
                      </Row>
                      <div className="text-center">
                        Vous n'avez pas un compte?{" "}
                        <a href="/authentication/register" className="text-info ml-1">
                          <b>Créer</b>
                        </a>
                      </div>
                      {status && (
                        <div className={"alert alert-danger"}>{status}</div>
                      )}
                    </Form>
                </Formik>
              </Col>
            </Row>
          </div>
          {/* <div id="recoverform">
            <div className="logo">
              <span className="db">
                <img src={img1} alt="logo" />
              </span>
              <h5 className="font-medium mb-3">Recover Password</h5>
              <span>
                Enter your Email and instructions will be sent to you!
              </span>
            </div>
            <Row className="mt-3">
              <Col xs="12">
                <Form action="/dashbaord">
                  <FormGroup>
                    <Input
                      type="text"
                      name="uname"
                      bsSize="lg"
                      id="Name"
                      placeholder="Username"
                      required
                    />
                  </FormGroup>
                  <Row className="mt-3">
                    <Col xs="12">
                      <Button color="danger" size="lg" type="submit" block>
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

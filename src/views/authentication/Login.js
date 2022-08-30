import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
  Row,
  Col,
  Button,
} from "reactstrap";
import img1 from "../../assets/images/logo-icon.png";
import img2 from "../../assets/images/background/login-register.jpg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom'

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
              <h5 className="font-medium mb-3">Sign In to Admin</h5>
              {/* <div className="alert alert-success">
                Username: test & Password: test
              </div> */}
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
                  onSubmit={(
                    { username, password },
                    { setStatus, setSubmitting }
                  ) => {
                    setStatus();
                    $api.authService.signin({ email: username, password }).then(
                      (response) => {
                        loginFn(response.data.data);
                        // dispatch({ type: '$authData/setToken', value: response.data.data.accessToken })

                        const { from } = location.state || { from: { pathname: "/" } };
                        console.log(location)
                        navigate((from || {pathname: "/"}));
                      },
                      (error) => {
                        setSubmitting(false);
                        setStatus(error?.response?.data.error.message || error.message);
                      }
                    );
                  }}
                  render={({ errors, status, touched, isSubmitting }) => (
                    <Form className="mt-3" id="loginform">
                      <InputGroup className="mb-3">
                          <InputGroupText>
                            <i className="ti-user"></i>
                          </InputGroupText>

                        <Field
                          name="username"
                          type="text"
                          className={
                            "form-control" +
                            (errors.username && touched.username
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                          <InputGroupText>
                            <i className="ti-pencil"></i>
                          </InputGroupText>
                        <Field
                          name="password"
                          type="password"
                          className={
                            "form-control" +
                            (errors.password && touched.password
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </InputGroup>
                      {/* <div className="d-flex no-block align-items-center mb-3">
                        <CustomInput
                          type="checkbox"
                          id="exampleCustomCheckbox"
                          label="Remember Me"
                        />
                        <div className="ml-auto">
                          <a
                            href="#recoverform"
                            id="to-recover"
                            onClick={handleClick.bind(null)}
                            className="forgot text-dark float-right"
                          >
                            <i className="fa fa-lock mr-1"></i> Forgot pwd?
                          </a>
                        </div>
                      </div> */}
                      <Row className="mb-3">
                        <Col xs="12">
                          <button
                            type="submit"
                            className="btn btn-block btn-primary"
                            disabled={isSubmitting}
                          >
                            Login
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
                  )}
                />
              </Col>
            </Row>
          </div>
          <div id="recoverform">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledCarousel,
  Progress,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import * as data from "./Data";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../../assets/images/redux.png";
// import logolighticon from "../../../assets/images/logo-light-icon.png";
import logodarktext from "../../../assets/images/reduxx.png";
// import logolighttext from "../../../assets/images/reduxx.png";
import profilephoto from "../../../assets/images/users/1.jpg";

import useAuth from '../../../hooks/useAuth';

export default function Header() {
  const { authUser: user, logoutFn } = useAuth(ctx => ctx)
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const [hiddenLogo, setHiddenLogo] = useState(false);

  const settings = useSelector((state) => state.settings);

  const toggle = () => {
    if(isOpen) setHiddenLogo(true)
    else setHiddenLogo(false)
    setIsOpen(!isOpen);
  };

  const showMobilemenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  };

  const sidebarHandler = () => {
    let element = document.getElementById("main-wrapper");
    switch (settings.activeSidebarType) {
      case "full":
      case "iconbar":
        // console.log('Minimazed state')
        setHiddenLogo((prevState) => !prevState)
        element.classList.toggle("mini-sidebar");
        if (element.classList.contains("mini-sidebar")) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;

      case "overlay":
      case "mini-sidebar":
        element.classList.toggle("full");
        if (element.classList.contains("full")) {
          element.setAttribute("data-sidebartype", "full");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;
      default:
    }
  };

  return (
    <header className="topbar navbarbg" data-navbarbg={settings.activeNavbarBg}>
      <Navbar
        className={
          "top-navbar " +
          (settings.activeNavbarBg === "skin6" ? "navbar-light" : "navbar-dark")
        }
        expand="md"
      >
        <div className="navbar-header" id="logobg" data-logobg={settings.activeLogoBg} >
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span className="nav-toggler d-block d-md-none" onClick={showMobilemenu.bind(null)} >
            <i className="ti-menu ti-close" />
          </span>
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand href="/" className={ !hiddenLogo ? 'justify-content-center' : ''}>
            {
              hiddenLogo ?
              <b className="logo-icon">
                <img src={logodarkicon} alt="homepage" className="dark-logo" />
              </b> :
              <span className="logo-text">
                <img src={logodarktext} alt="homepage" className="dark-logo" />
              </span>
            }
          </NavbarBrand>
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span
            className="topbartoggler d-block d-md-none"
            onClick={toggle.bind(null)}
          >
            <i className="ti-more" />
          </span>
        </div>
        <Collapse className="navbarbg" isOpen={isOpen} navbar data-navbarbg={settings.activeNavbarBg} >
          <Nav className="float-left" navbar>
            <NavItem>
              <NavLink
                href="#"
                className="d-none d-md-block"
                onClick={sidebarHandler.bind(null)}
              >
                <i className="ti-menu" />
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto float-right" navbar>
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Profile Dropdown                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="pro-pic flex flex-col items-center justify-center">
                <img
                  src={profilephoto}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </DropdownToggle>
              <DropdownMenu end className="user-dd">
                <span className="with-arrow">
                  <span className="bg-primary" />
                </span>
                <div className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2">
                  <div className="">
                    <img
                      src={profilephoto}
                      alt="user"
                      className="rounded-circle"
                      width="60"
                    />
                  </div>
                  <div className="ml-2">
                    <h4 className="mb-0">{ user?.name }</h4>
                    <p className=" mb-0">{ user?.email }</p>
                  </div>
                </div>
                {/* <DropdownItem>
                  <i className="ti-user mr-1 ml-1" /> My Account
                </DropdownItem>
                <DropdownItem>
                  <i className="ti-wallet mr-1 ml-1" /> My Balance
                </DropdownItem>
                <DropdownItem>
                  <i className="ti-email mr-1 ml-1" /> Inbox
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className="ti-settings mr-1 ml-1" /> Account Settings
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem href="" onClick={ () => {
                  logoutFn().then(() => navigate('/authentication/login', { replace: true }))
                  // eslint-disable-next-line no-undef
                  // props.history.push()
                }}>
                  <i className="fa fa-power-off mr-1 ml-1" /> Se deconnecter
                </DropdownItem>
                {/* <DropdownItem divider />
                <Button color="success" className="btn-rounded ml-3 mb-2 mt-2">
                  View Profile
                </Button> */}
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Profile Dropdown                                                           */}
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

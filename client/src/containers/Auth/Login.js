import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
// import userService cline
import { handleLoginApi } from "../../services/userService";
import "./Login.scss";
// import { FormattedMessage } from 'react-intl';

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleOnClickEye = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleLogin = async () => {
    setErrMessage("");
    try {
      let response = await handleLoginApi(username, password);
      if (response && response.data.errCode !== 0) {
        setErrMessage(response.data.message);
      }
      if (response && response.data.errCode === 0) {
        props.userLoginSuccess(response.data.user);
        console.log("login success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrMessage(error.response.data.message);
        }
      }
    }
  };

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    // link tham khảo form https://codepen.io/FlorinPop17/pen/vPKWjd
    <div className="login-background">
      <h2>Sign in/up Form</h2>
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                value={username}
                onChange={handleOnChangeUsername}
              />
            </div>
            <div className="form-control custom-eye">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handleOnChangePassword}
              />
              <span>
                <i
                  className={
                    isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                  }
                  onClick={handleOnClickEye}
                ></i>
              </span>
            </div>

            <div className="messageTag" style={{ color: "red" }}>
              {errMessage}
            </div>

            <a href="#">Forgot your password?</a>
            <button type="button" onClick={handleLogin}>
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

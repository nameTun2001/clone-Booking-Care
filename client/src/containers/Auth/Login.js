import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
// import userService cline
import { handleLoginApi } from "../../services/userService";
import "./Login.scss";
// import { FormattedMessage } from 'react-intl';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  //   const [isActive, setIsActive] = useState(false);
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleOnClickEye = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      // console.log(data);
      
      if(data && data.errCode !== 0){
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.adminLoginSuccess(data.user);
        console.log("login success");
      }
    } 
    catch (error) {
      if (error.response) {
        console.log('error response',error.response);
        
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  render() {
    return (
      // link tham khảo form https://codepen.io/FlorinPop17/pen/vPKWjd
      <div className="login-background">
        <h2>Sign in/up Form</h2>
        <div className="container" id="container">
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
                  value={this.state.username}
                  onChange={(event) =>
                    this.handleOnChangeUsername(event, "username")
                  }
                />
              </div>
              <div className="form-control custom-eye">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.handleOnChangePassword(event, "password")
                  }
                />
                <span>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fa-solid fa-eye"
                        : "fa-solid fa-eye-slash"
                    }
                    onClick={(event) => this.handleOnClickEye(event)}
                  ></i>
                </span>
              </div>

              <div className="messageTag" style={{ color: "red" }}>
                {console.log("errMessage", this.state.errMessage)}
                {this.state.errMessage}
              </div>

              <a href="#">Forgot your password?</a>
              <button
                onClick={() => {
                  this.handleLogin();
                }}
              >
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
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const signUpButton = document.getElementById("signUp");
// const signInButton = document.getElementById("signIn");
// const container = document.getElementById("container");
// signInButton.onclick = () => {container.classList.add("right-panel-active");}
// signUpButton.addEventListener("click", () => {
//   container.classList.add("right-panel-active");
// });

// signInButton.addEventListener("click", () => {
//   container.classList.remove("right-panel-active");
// });

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.username = '';
    this.password = '';
    this.err = '';
  }

  loginWithFacebook = event => {
    const st = this.props;
    const { FB } = window;
    FB.login(
      response => {
        const {
          authResponse: { accessToken, userID }
        } = response;
        event.persist();
        st.LoginWithFacebookRequest(accessToken, userID);
      },
      { scope: 'public_profile, email' }
    );
    return false;
  };

  render() {
    const st = this.props;
    const UserCookie = cookie.load('userId');
    if (UserCookie && !st.isLogin) {
      st.GetUserRequest(cookie.load('userId'));
      return <Redirect to="/options" />;
    }
    if (st.isLogin) {
      return <Redirect to="/options" />;
    }
    if (st.token === 'err') {
      this.err = 'Username hoặc mật khẩu không đúng!!!';
    }

    return (
      <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-30">
              <form className="login100-form validate-form">
                <span className="login100-form-title p-b-49">Login</span>

                <div
                  className="wrap-input100 validate-input m-b-23"
                  data-validate="Username is reauired"
                >
                  <span className="label-input100">Username</span>
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    onChange={event => {
                      this.username = event.target.value;
                    }}
                    autoComplete="username"
                    placeholder="Type your username"
                  />
                  <span className="focus-input100" data-symbol="&#xf206;" />
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <span className="label-input100">Password</span>
                  <input
                    className="input100"
                    type="password"
                    name="pass"
                    onChange={event => {
                      this.password = event.target.value;
                    }}
                    autoComplete="current-password"
                    placeholder="Type your password"
                  />
                  <span className="focus-input100" data-symbol="&#xf190;" />
                </div>

                <div className="text-right p-b-35" />
                <div className="Error">{this.err}</div>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button
                      type="button"
                      style={{
                        background: 'rgb(255, 70, 90, 0.6)'
                      }}
                      className="login100-form-btn"
                      onClick={event => {
                        event.preventDefault();
                        st.Login(this.username, this.password);
                        return <Redirect to="/info" />;
                      }}
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div className="divRegister">
                  <a className=" txt2 p-l-152" href="/register" variant="body2">
                    Do not have an account? Sign Up
                  </a>
                </div>
                <center>
                  <div className="txt1 text-center p-t-40 p-b-20">
                    <span>Or Sign Up Using</span>
                  </div>
                </center>
                <div className="flex-c-m">
                  <button
                    onClick={this.loginWithFacebook}
                    type="button"
                    className="login100-social-item bg1"
                  >
                    <i className="fa fa-facebook" />
                  </button>

                  <button type="button" className="login100-social-item bg3">
                    <i className="fa fa-google" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

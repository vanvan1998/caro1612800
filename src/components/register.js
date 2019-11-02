import React from 'react';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import LockRoundedIcon from '@material-ui/icons/LockRounded';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
import '../App.css';
import { Redirect } from 'react-router-dom';

export default class SignUp extends React.PureComponent {
  constructor() {
    super();
    this.username = '';
    this.name = '';
    this.email = '';
    this.dateOfBirth = '';
    this.sex = '';
    this.password = '';
    this.confirmPassword = '';
    this.err = '';
  }

  render() {
    const st = this.props;
    if (st.isRegister) {
      return <Redirect to="/" />;
    }
    if (st.CheckLoadRegister) {
      this.err = st.err;
    }
    return (
      <div className="page-wrapper bg-gra-01 p-t-50 p-b-50 font-poppins">
        <div className="wrapper wrapper--w830">
          <div className="card card-3">
            <div className="card-heading" />
            <div className="card-body">
              <center>
                <h2 className="title">Registration Info</h2>
              </center>
              <form method="POST">
                <div className="input-group">
                  <input
                    className="input--style-3"
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={event => {
                      this.name = event.target.value;
                    }}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-3"
                    type="text"
                    placeholder="Birth date"
                    name="birthday"
                    onChange={event => {
                      this.dateOfBirth = event.target.value;
                    }}
                  />
                </div>
                <div className="input-group">
                  <div className="rsselect2">
                    <select
                      className="rsselect2"
                      name="gender"
                      onChange={event => {
                        this.sex = event.target.value;
                      }}
                    >
                      <option disabled="disabled" selected="selected">
                        Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="select-dropdown" />
                  </div>
                </div>
                <div className="input-group">
                  <input
                    className="input--style-3"
                    type="username"
                    placeholder="Username"
                    name="Username"
                    onChange={event => {
                      this.username = event.target.value;
                    }}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-3"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={event => {
                      this.email = event.target.value;
                    }}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-3"
                    type="password"
                    placeholder="Password"
                    name="Pass"
                    onChange={event => {
                      this.password = event.target.value;
                    }}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-3"
                    type="password"
                    placeholder="Confirm Password"
                    name="ConfirmPass"
                    onChange={event => {
                      this.confirmPassword = event.target.value;
                    }}
                  />
                </div>
                <div className="ErrorRegister">{this.err}</div>
                <center>
                  <div className="p-t-10">
                    <button
                      className="btn btn--pill btn--green"
                      type="button"
                      onClick={event => {
                        event.preventDefault();
                        st.Register(
                          this.username,
                          this.name,
                          this.email,
                          this.dateOfBirth,
                          this.sex,
                          this.password,
                          this.confirmPassword
                        );
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="divtologin">
                    <a className=" txt2 m-t-100" href="/" variant="body2">
                      Already have an account? Sign in
                    </a>
                  </div>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

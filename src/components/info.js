import React from 'react';
import Button from '@material-ui/core/Button';
import '../App.css';
import { withRouter, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import FormData from 'form-data';
import RoundImg from 'react-rounded-image';
import * as types from '../constants/constants';

class Info extends React.PureComponent {
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
    this.fileImage = null;
    this.imagesrc = `${types.stringConnect}/uploads/default_avatar.png`;
  }

  fileSelectedHandler = event => {
    // eslint-disable-next-line prefer-destructuring
    this.fileImage = event.target.files[0];
  };

  fileUploadHandler = async event => {
    if (this.fileImage) {
      const st = this.props;
      const fd = new FormData();
      fd.append('_id', st.id);
      fd.append('userImage', this.fileImage, this.fileImage.name);
      event.preventDefault();
      st.UploadImageRequest(fd, cookie.load('token'));
    }
  };

  render() {
    console.log('options111111111111');
    const st = this.props;
    this.username = st.username;
    this.name = st.name;
    this.email = st.email;
    this.dateOfBirth = st.dateOfBirth;
    this.sex = st.sex;
    const UserCookie = cookie.load('token');
    if (st.image) {
      this.imagesrc = types.stringConnect + st.image;
    }
    if (UserCookie && this.username === '') {
      st.GetUserRequest(cookie.load('token'));
      return <Redirect to="/info" />;
    }
    if (!st.isLogin) {
      return <Redirect to="/" />;
    }

    if (st.statusUploadImage !== '') {
      st.NoStatusImage();
      st.GetUserRequest(cookie.load('token'));
      return <Redirect to="/info" />;
    }

    if (st.isUpdate !== '') {
      st.NoUpdateUser();
      this.err = st.isUpdate;
    }
    // if (st.isGame) {
    //   console.log('info');
    //   st.NoInfo();
    //   st.IsOptionsPage();
    //   return <Redirect to="/options" />;
    // }
    return (
      <div className="page-wrapper bg-gra-01 p-t-50 p-b-50 font-poppins">
        <div className="wrapper wrapper--w900">
          <div className="card card-3 cardInfo p-l-50 p-r-50">
            <div className="UserImage">
              <RoundImg
                imageWidth="350"
                imageHeight="350"
                roundedColor="white"
                image={this.imagesrc}
              />
              <div className="UploadImage">
                <input
                  className="InputImage"
                  type="file"
                  onChange={this.fileSelectedHandler}
                />
                <center>
                  <button
                    className="btn btn--pill"
                    type="button"
                    variant="contained"
                    color="secondary"
                    style={{
                      background: 'rgb(255, 60, 80,0.8)',
                      margin: '10px 43px 0px 0px'
                    }}
                    onClick={this.fileUploadHandler}
                  >
                    UpLoad
                  </button>
                </center>
              </div>
            </div>
            {/* <div className="card-heading" /> */}
            <div className="card-body">
              <center>
                <h2 className="title">Info</h2>
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
                    defaultValue={this.name}
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
                    defaultValue={this.dateOfBirth}
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
                      defaultValue={this.sex}
                    >
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
                    value={this.username}
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
                    defaultValue={this.email}
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
                      className="btn btn--pill"
                      type="button"
                      onClick={event => {
                        event.preventDefault();
                        st.UpdateUser(
                          st.id,
                          this.username,
                          this.name,
                          this.email,
                          this.dateOfBirth,
                          this.sex,
                          this.password,
                          this.confirmPassword,
                          cookie.load('token')
                        );
                      }}
                      style={{
                        background: 'rgb(255, 60, 80,0.8)'
                      }}
                    >
                      Update
                    </button>
                  </div>
                  <div className="divtologin">
                    <Button
                      type="button"
                      style={{ color: 'blue' }}
                      onClick={event => {
                        event.preventDefault();
                        // st.IsGame();
                        st.IsOptionsPage();
                        //   return <Redirect to="/options" />;
                        st.history.push('/options');
                      }}
                    >
                      Play game
                    </Button>
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

export default withRouter(Info);


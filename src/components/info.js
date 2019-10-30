import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import Container from '@material-ui/core/Container';
import '../App.css';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import FormData from 'form-data';
import RoundImg from 'react-rounded-image';
import * as types from '../constants/constants';

export default class Info extends React.PureComponent {
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
    this.imagesrc = `${types.stringConnect}/uploads/account.png`;
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
      st.UploadImageRequest(fd, cookie.load('userId'));
    }
  };

  render() {
    const st = this.props;
    this.username = st.username;
    this.name = st.name;
    this.email = st.email;
    this.dateOfBirth = st.dateOfBirth;
    this.sex = st.sex;
    const UserCookie = cookie.load('userId');
    if (st.image) {
      this.imagesrc = types.stringConnect + st.image;
    }
    if (UserCookie && this.username === '') {
      st.GetUserRequest(cookie.load('userId'));
      return <Redirect to="/info" />;
    }
    if (!st.isLogin) {
      return <Redirect to="/" />;
    }

    if (st.statusUploadImage !== '') {
      st.NoStatusImage();
      st.GetUserRequest(cookie.load('userId'));
      return <Redirect to="/info" />;
    }

    if (st.isUpdate !== '') {
      st.NoUpdateUser();
      this.err = st.isUpdate;
    }
    if (st.isGame) {
      st.NoPlayGame();
      st.NoInfo();
      return <Redirect to="/game" />;
    }
    return (
      <div className="Info">
        <div className="UserImage">
          <RoundImg
            imageWidth="400"
            imageHeight="400"
            roundedColor="white"
            image={this.imagesrc}
          />
          <div className="UploadImage">
            <Grid item xs={12} sm={10}>
              <input
                className="InputImage"
                type="file"
                onChange={this.fileSelectedHandler}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                style={{
                  background: 'rgb(255, 60, 80,0.8)'
                }}
                onClick={this.fileUploadHandler}
              >
                UpLoad
              </Button>
            </Grid>
          </div>
        </div>
        <div className="InfoLayout">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="paper">
              <center>
                <InfoSharpIcon className="Icon" style={{ fontSize: 50 }} />
                <Typography component="h1" variant="h5">
                  Infomation
                </Typography>
              </center>
              <form className="form" noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="Name"
                      variant="outlined"
                      required
                      fullWidth
                      id="Name"
                      onChange={event => {
                        this.name = event.target.value;
                      }}
                      label="Full Name"
                      defaultValue={this.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="DateOfBirth"
                      label="Date Of Birth"
                      onChange={event => {
                        this.dateOfBirth = event.target.value;
                      }}
                      name="DateOfBirth"
                      defaultValue={this.dateOfBirth}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="sex"
                      label="Sex"
                      onChange={event => {
                        this.sex = event.target.value;
                      }}
                      name="sex"
                      defaultValue={this.sex}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      value={this.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      onChange={event => {
                        this.email = event.target.value;
                      }}
                      label="Email Address"
                      name="email"
                      defaultValue={this.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={event => {
                        this.password = event.target.value;
                      }}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onChange={event => {
                        this.confirmPassword = event.target.value;
                      }}
                      name="confirmPassword"
                      label="Conform Password"
                      type="password"
                      id="confirmPassword"
                    />
                  </Grid>
                </Grid>
                <div className="ErrorRegister">{this.err}</div>
                <div className="GridForm">
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    style={{
                      margin: '10px 0px 0px 0px',
                      background: 'rgb(255, 60, 80,0.8)'
                    }}
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
                        cookie.load('userId')
                      );
                    }}
                  >
                    Update
                  </Button>
                </div>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button
                      type="button"
                      style={{ margin: '-30px 0px 0px 0px', color: 'blue' }}
                      onClick={event => {
                        event.preventDefault();
                        // st.Login(st.username, st.password);
                        // st.GetUserRequest(cookie.load('userId'));
                        st.IsGame();
                      }}
                    >
                      Play game
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

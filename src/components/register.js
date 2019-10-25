import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
    this.err = '';
  }

  render() {
    const st = this.props;
    if (st.isRegister) {
      return <Redirect to="/login" />;
    }
    if (st.CheckLoadRegister) {
      this.err = 'Có lỗi xảy ra, vui lòng thử lại!!!';
    }
    return (
      <div className="loginLayout">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <center>
              <LockRoundedIcon className="Icon" style={{ fontSize: 40 }} />
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </center>
            <form className="form" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="Name"
                    variant="outlined"
                    required
                    fullWidth
                    id="Name"
                    onChange={event => {
                      this.name = event.target.value;
                    }}
                    label="Full Name"
                    autoFocus
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
                    autoComplete="DateOfBirth"
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
                    autoComplete="sex"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    onChange={event => {
                      this.username = event.target.value;
                    }}
                    label="Username"
                    name="username"
                    autoComplete="username"
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
                    autoComplete="email"
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
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <div className="ErrorRegister">{this.err}</div>
              <div className="GridForm">
                <Button
                  fullWidth
                  onClick={event => {
                    event.preventDefault();
                    st.Register(
                      this.username,
                      this.name,
                      this.email,
                      this.dateOfBirth,
                      this.sex,
                      this.password
                    );
                  }}
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </div>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

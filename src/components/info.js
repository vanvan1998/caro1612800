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

export default class Info extends React.PureComponent {
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
    this.username = st.username;
    this.name = st.name;
    this.email = st.email;
    this.dateOfBirth = st.dateOfBirth;
    this.sex = st.sex;
    if (!st.isLogin) {
      return <Redirect to="/" />;
    }
    if (st.isGame) {
      st.NoPlayGame();
      st.NoInfo();
      return <Redirect to="/game" />;
    }
    return (
      <div className="loginLayout">
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
                    value={this.name}
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
                    value={this.dateOfBirth}
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
                    value={this.sex}
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
                    value={this.email}
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
                  Update
                </Button>
              </div>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button
                    type="button"
                    onClick={event => {
                      event.preventDefault();
                      st.Login(st.username, st.password);
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
    );
  }
}

import React from 'react';
import '../App.css';
import RoundImg from 'react-rounded-image';
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies';
import { withRouter, Redirect } from 'react-router-dom';
import * as types from '../constants/constants';

class Options extends React.Component {
  constructor() {
    super();
    this.imagesrc = `${types.stringConnect}/uploads/default_avatar.png`;
  }

  render() {
    const st = this.props;
    const UserCookie = cookie.load('token');
    if (st.image) {
      const imageString = st.image;
      console.log(imageString);
      console.log(imageString.indexOf('http'));
      if (imageString.indexOf('http') === 0) {
        this.imagesrc = st.image;
      } else {
        this.imagesrc = types.stringConnect + st.image;
      }
    }
    if (UserCookie && st.name === '') {
      st.GetUserRequest(cookie.load('token'));
    } else {
      if (st.token === 'err') {
        return <Redirect to="/" />;
      }
      if (st.token === '') {
        return <Redirect to="/" />;
      }
    }
    if (st.isOptions) {
      st.IsOptionsPage();
    }

    if (st.typePlay === 'Create new game' || st.typePlay === 'Play now') {
      return <Redirect to="/gameonline" />;
    }
    if (st.typePlay === 'Play with computer' || st.typePlay === 'Play nomal') {
      return <Redirect to="/game" />;
    }
    // if (st.isInfo) {
    //   return <Redirect to="/info" />;
    // }
    return (
      <div className="limiter">
        <div className="OptionsPage">
          <div
            className="wrap-login100"
            style={{ boxShadow: '5px 7px 5px 5px rgb(92, 92, 92)' }}
          >
            <div
              className="divAvatar"
              style={{
                margin: '5px 0px 0px 5px'
              }}
            >
              <RoundImg
                imageWidth="70"
                imageHeight="70"
                roundedSize="2"
                roundedColor="black"
                image={this.imagesrc}
              />
              <Button
                type="button"
                style={{
                  height: '30px ',
                  fontSize: '20px',
                  margin: '0px 0px 0px 0px'
                }}
                onClick={() => {
                  // event.preventDefault();
                  // st.Info();
                  st.history.push('/info');
                }}
              >
                {st.name}
              </Button>
            </div>
            <div className="p-l-55 p-r-55 p-t-25 p-b-30">
              <form className="login100-form validate-form">
                <span className="login100-form-title p-b-49">Menu</span>
                <span className="SpanOptions p-b-49">Online:</span>
                <button
                  className="btn btn--pill btn-options-top"
                  type="button"
                  variant="contained"
                  color="secondary"
                  style={{
                    background: 'rgb(255, 60, 80,0.8)'
                  }}
                  onClick={event => {
                    event.preventDefault();
                    st.IsPlayNow();
                  }}
                >
                  Play now
                </button>
                <br />
                <button
                  className="btn btn--pill btn-options-bottom"
                  type="button"
                  variant="contained"
                  color="secondary"
                  style={{
                    background: 'rgb(255, 60, 80,0.8)'
                  }}
                  onClick={event => {
                    event.preventDefault();
                    st.IsCreateNewGame();
                  }}
                >
                  Create new room
                </button>
                <span className="SpanOptions p-b-49">Offline:</span>
                <button
                  className="btn btn--pill btn-options-top"
                  type="button"
                  variant="contained"
                  color="secondary"
                  style={{
                    background: 'rgb(255, 60, 80,0.8)'
                  }}
                  onClick={event => {
                    event.preventDefault();
                    st.NomalPlayClick();
                  }}
                >
                  Nomal Play
                </button>
                <br />
                <button
                  className="btn btn--pill btn-options-bottom"
                  type="button"
                  variant="contained"
                  color="secondary"
                  style={{
                    background: 'rgb(255, 60, 80,0.8)'
                  }}
                  onClick={event => {
                    event.preventDefault();
                    st.MachinePlayClick();
                  }}
                >
                  Play with computer
                </button>
                <br />
                <center>
                  <button
                    className="btn btn--pill btn--green"
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={event => {
                      event.preventDefault();
                      st.Logout();
                    }}
                  >
                    Log out
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Options);

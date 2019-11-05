/* eslint-disable func-names */
/* eslint-disable camelcase */
import React from 'react';
import '../App.css';
import { withRouter, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import cookie from 'react-cookies';
import io from 'socket.io-client';
import RoundImg from 'react-rounded-image';
import $ from 'jquery';
import Board from './board';
import * as types from '../constants/constants';

$.fn.visible = function() {
  return this.css('visibility', 'visible');
};

$.fn.display = function() {
  return this.css('display', 'flex');
};

$.fn.hidden = function() {
  return this.css('visibility', 'hidden');
};

$.fn.displayBlock = function() {
  return this.css('display', 'block');
};

class GameOnline extends React.Component {
  constructor() {
    super();
    this.imagesrc = `${types.stringConnect}/uploads/default_avatar.png`;
    this.newMessage = '';
    this.typePlay = cookie.load('typePlay');
    this.socket = null;
    this.room = '';
    this.mess = {
      messages: [{ id: 1, userId: 0, message: 'Hello' }],
      user: null
    };
    this.roomNumber = '';
    cookie.remove('typePlay', { path: '/' });
  }

  UNSAFE_componentWillMount() {
    const state = this.props;
    let currentRoom = '';
    let player2 = null;
    const { typePlay } = this;
    if (state.id !== '' || typePlay) {
      this.socket = io('http://localhost:3000');
      const sk = this.socket;
      this.socket.on('server-request-client-init-info', function() {
        const data = {
          userId: state.id,
          name: state.name
        };
        sk.emit('client-send-init-info', data);
      });
      this.socket.on('server-init-success', function() {
        if (typePlay === 'Create new game') {
          sk.emit('client-create-new-room');
        }
        if (typePlay === 'Play now') {
          sk.emit('client-play-now');
        }
      });

      this.socket.on('server-send-room', function(r) {
        try {
          $('#roomNumber').html('');
          currentRoom = r.room;
          $('#roomNumber').append($('<h4>').text(`Room: ${currentRoom}`));
          if (r.namePlayer1 !== state.name) {
            player2 = {
              name: r.namePlayer1,
              image: r.imagePlayer1
            };
          } else {
            player2 = {
              name: r.namePlayer2,
              image: r.imagePlayer2
            };
          }
          if (player2.name) {
            $('#divPlayer2').visible();
            $('#divPlayer2').display();
            $('#namePlayer2').html(player2.name);
            if (player2.image) {
              $('#imagePlayer2').attr(
                'src',
                types.stringConnect + player2.image
              );
            } else {
              $('#imagePlayer2').attr(
                'src',
                `${types.stringConnect}/uploads/default_avatar.png`
              );
            }
          }
        } catch (err) {
          console.log(err);
        }
      });
      this.socket.on('server-send-new-message', function(msg) {
        if (msg.owner === 'competitor') {
          $('#messages').append(
            $('<div class="li-left li-name"></div>').text(`${player2.name}`)
          );
          $('#messages').append(
            $('<div class="li-left li-online"></div>').text(`${msg.message}`)
          );
        } else {
          $('#messages').append(
            $('<div class="li-left li-online li-mess-server"></div>').text(
              `${msg.message}`
            )
          );
        }
      });

      this.socket.on('server-enable-your-turn', function(turn) {
        console.log('cho phép đánh', turn);
      });
      this.socket.on('server-enable-your-turn', function(turn) {
        console.log('cho phép đánh', turn);
      });
      this.socket.on('competitor-want-a-draw-game', function() {
        $('#notification').html('');
        $('#notification').append(
          $('<span>').text(`${player2.name} want a draw game?`)
        );
        $('#new-notification').visible();
        $('#new-notification').display();
      });
    }
  }

  buttonClickSend = () => {
    const message = this.newMessage;
    this.socket.emit('client-send-message', message);
    $('#messages').append(
      $('<div class="li-right li-online"></div>').text(`${this.newMessage}`)
    );
    $('#inputMessages').val('');
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.buttonClickSend();
    }
  };

  render() {
    const st = this.props;
    const UserCookie = cookie.load('token');
    if (!this.typePlay || st.isOptions) {
      return <Redirect to="/options" />;
    }
    if (st.image) {
      this.imagesrc = types.stringConnect + st.image;
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

    // if (st.isInfo) {
    //   return <Redirect to="/info" />;
    // }
    const historyGame = st.historyGame.slice(0, st.stepNumber + 1);
    const current = historyGame[st.stepNumber];
    st.calculateWinner(current.squares);
    const { winner } = st;
    const { Sortvalue } = st;
    const moves = historyGame.map((step, move) => {
      const desc = move
        ? `Go to move [${st.row[move]}][${st.col[move].toString()}]`
        : 'Go to game start';
      return (
        <li key={move}>
          <Button
            type="button"
            style={
              st.stepNumber === move
                ? {
                    fontWeight: 'bold',
                    background: 'rgba(210, 200, 200, 0.8)',
                    margin: '2px'
                  }
                : {
                    fontWeight: 'normal',
                    background: 'rgba(230, 200, 200, 0.8)',
                    margin: '1.5px'
                  }
            }
            onClick={() => st.jumpTo(move)}
          >
            {desc}
          </Button>
        </li>
      );
    });
    if (Sortvalue === 'Sort ascending') {
      moves.reverse();
    }
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next step: ${st.xIsNext ? 'X' : 'O'}`;
    }
    // ==========giao diện============
    return (
      <div className="gameonline">
        <Card
          style={{
            boxShadow: '3px 3px 5px 5px rgb(133, 131, 131)',
            height: '675px',
            display: 'inline-block'
          }}
        >
          <div className="game-board">
            <Board
              squares={current.squares}
              color={(i, j) => {
                if (winner) {
                  for (let m = 0; m < 9; m += 2) {
                    if (i === st.temp[m] && j === st.temp[m + 1]) {
                      return 'red';
                    }
                  }
                }
                return 'black';
              }}
              onClick={(i, j) => st.handleClick(i, j)}
            />
          </div>
        </Card>
        <Card
          className="gameonline-info"
          style={{
            boxShadow: '3px 3px 5px 5px rgb(133, 131, 131)',
            background: 'rgb(250, 215, 215)'
          }}
        >
          <div>
            {/* ==================================button exit and log out=========================================== */}
            <div>
              <Button
                style={{
                  textAlign: 'left',
                  float: 'left'
                }}
                className="logoutButton"
                color="secondary"
                type="button"
                onClick={event => {
                  this.socket.disconnect();
                  event.preventDefault();
                  st.IsOptionsPage();
                }}
              >
                &lt; Exit
              </Button>
              <Button
                style={{
                  textAlign: 'right',
                  float: 'right'
                }}
                className="logoutButton"
                color="secondary"
                type="button"
                onClick={event => {
                  this.socket.disconnect();
                  event.preventDefault();
                  st.Logout();
                }}
              >
                Log out &gt;
              </Button>
            </div>
            <br />
            <br />
            {/* ==================================avatar and name=========================================== */}
            <div className="divAvatar row">
              <div id="divPlayer2" className="col-md-5 row divAvatarPlayer2">
                <img
                  id="imagePlayer2"
                  className="col-md-2"
                  alt="Avatar"
                  style={{
                    borderRadius: '50%',
                    padding: 0,
                    maxWidth: '40px',
                    maxHeight: '40px'
                  }}
                />
                <Button
                  id="namePlayer2"
                  className="col-md-9"
                  type="button"
                  style={{
                    height: '30px ',
                    fontSize: '13px',
                    margin: '0px 0px 50px 0px',
                    background: 'none'
                  }}
                >
                  &nbsp;
                </Button>
              </div>
              <div className="col-md-2">
                <center>
                  <button
                    id="buttonDraw"
                    type="button"
                    className="btn-gameonline"
                    variant="contained"
                    color="secondary"
                    style={{
                      background: 'rgb(255, 60, 80,0.8)'
                    }}
                    onClick={() => {
                      this.socket.emit('client-ask-draw-game');
                      // $('#buttonDraw').hidden();
                      // $('#buttonDraw').displayBlock();
                    }}
                  >
                    Draw
                  </button>
                  <button
                    type="button"
                    className="btn-gameonline"
                    variant="contained"
                    color="secondary"
                    style={{
                      background: 'rgb(255, 60, 80,0.8)'
                    }}
                    onClick={() => {
                      this.socket.emit('client-surrender');
                    }}
                  >
                    Surrender
                  </button>
                </center>
              </div>
              <div className="col-md-5 row divAvatarPlayer1">
                <Button
                  className="col-md-9"
                  type="button"
                  style={{
                    height: '30px ',
                    fontSize: '13px',
                    margin: '0px 0px 50px 0px',
                    background: 'none'
                  }}
                >
                  {st.name}
                </Button>
                <RoundImg
                  className="col-md-2"
                  imageWidth="40"
                  imageHeight="40"
                  roundedSize="0"
                  roundedColor="white"
                  image={this.imagesrc}
                />
              </div>
            </div>
            <div id="new-notification">
              <span id="notification"> </span>
              <button
                id="yes"
                type="button"
                onClick={() => {
                  $('#new-notification').hidden();
                  $('#new-notification').displayBlock();
                  this.socket.emit('client-answer-draw-game', 'yes');
                }}
                className="btn-gameonline"
                variant="contained"
                color="secondary"
                style={{
                  background: 'rgb(255, 60, 80,0.8)'
                }}
              >
                Yes
              </button>
              <button
                id="no"
                type="button"
                className="btn-gameonline"
                variant="contained"
                color="secondary"
                style={{
                  background: 'rgb(255, 60, 80,0.8)'
                }}
                onClick={() => {
                  $('#new-notification').hidden();
                  $('#new-notification').displayBlock();
                  this.socket.emit('client-answer-draw-game', 'no');
                }}
              >
                No
              </button>
            </div>
            {/* ==================================chat box=========================================== */}
            <Card
              style={{
                margin: '10px 10px 10px 10px',
                padding: '15px',
                height: '465px',
                background: 'white'
              }}
            >
              <div>
                <h4>{status}</h4>
                <div id="roomNumber">
                  <h4>Room: waiting...</h4>
                </div>
              </div>
              <br />
              {/* =============================danh sách mess================================ */}
              <div style={{ overflow: 'auto', height: '325px' }}>
                <ul id="messages" />
              </div>
              {/* =============================message================================================= */}
              <form action="" style={{ margin: '10px 0px 0px 0px' }}>
                <input
                  id="inputMessages"
                  autoComplete="off"
                  style={{
                    height: '40px',
                    maxWidth: '80%',
                    borderStyle: 'ridge',
                    borderRadius: '20px',
                    marginTop: '10px',
                    padding: '0px 5px',
                    background: 'rgb(250, 215, 215)'
                  }}
                  onChange={event => {
                    this.newMessage = event.target.value;
                  }}
                  onKeyPress={this.handleKeyPress}
                />
                <Button
                  type="button"
                  style={{
                    height: '30px ',
                    fontSize: '20px',
                    marginBottom: '13px',
                    background: 'none'
                  }}
                  onClick={this.buttonClickSend}
                >
                  Send
                </Button>
              </form>
            </Card>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(GameOnline);

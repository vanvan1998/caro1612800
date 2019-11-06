/* eslint-disable func-names */
/* eslint-disable camelcase */
import React from 'react';
import '../App.css';
import { withRouter, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import cookie from 'react-cookies';
// import io from 'socket.io-client';
import RoundImg from 'react-rounded-image';
import $ from 'jquery';
import Board from './board';
import * as types from '../constants/constants';

$.fn.visible = function() {
  return this.css('visibility', 'visible');
};

$.fn.margin0 = function() {
  return this.css('margin-left', '5%');
};

$.fn.margin80 = function() {
  return this.css('margin-left', '80%');
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

class GameOnlineUi extends React.Component {
  constructor(props) {
    super(props);
    this.imagesrc = props.value.imagesrc;
    this.newMessage = props.value.newMessage;
    this.socket = props.value.socket;
    this.room = props.value.room;
    this.typePlay = cookie.load('typePlay');
    this.mess = props.value.mess;
    cookie.remove('typePlay', { path: '/' });
  }

  UNSAFE_componentWillMount() {
    const state = this.props;
    if (this.socket) {
      this.socket.on('server-send-move', function(turn) {
        state.HandleClickOnlineGame(turn.move.x, turn.move.y, turn.symbol);
      });
      this.socket.on('server-enable-your-turn', function() {
        // console.log('cho phép đánh', turn);
        $('#turnDiv').margin80();
      });
    }
  }

  buttonClickSend = () => {
    const message = this.newMessage;
    this.socket.emit('client-send-message', message);
    $('#messages').append($('<div class="li-right width100"></div>').text(' '));
    $('#messages').append(
      $('<div class="li-right li-online-send"></div>').text(
        `${this.newMessage}`
      )
    );
    $('#inputMessages').val('');
    this.newMessage = ' ';
    const div = $('#divMessage');
    div.scrollTop(div.prop('scrollHeight'));
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
      const imageString = st.image;
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
    // let status;
    const idPlayer1OfRoom = cookie.load('idPlayer1');
    const mySymbol = st.id === idPlayer1OfRoom ? 'X' : 'O';

    if (winner) {
      if (winner !== mySymbol) {
        this.socket.emit('client-lose-game');
      }
    }
    // =================================================giao diện============================================================
    return (
      <div className="gameonline">
        <Card
          style={{
            boxShadow: '3px 3px 5px 5px rgb(133, 131, 131)',
            height: '675px',
            display: 'inline-block'
          }}
        >
          <div className="game-board-online" id="gameBoard">
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
              onClick={(i, j) => {
                const data = { x: i, y: j };
                this.socket.emit('client-send-move', data);
                $('#turnDiv').margin0();
              }}
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
            {/* ==================================button exit=========================================== */}
            <div>
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
                  cookie.remove('idPlayer1', { path: '/' });
                  st.IsOptionsPage();
                }}
              >
                Exit &gt;
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
                  }}
                >
                  Draw
                </button>
                <button
                  id="buttonSurrender"
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
            {/* =================================lượt đánh========================================== */}
            <div id="turnDiv" />
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
                margin: '10px',
                padding: '15px',
                height: '450px',
                background: 'white'
              }}
            >
              <div>
                {/* <h4>{status}</h4> */}
                <div id="roomNumber" />
              </div>
              <br />
              {/* =============================danh sách mess================================ */}
              <div
                id="divMessage"
                style={{ overflow: 'auto', height: '328px' }}
              >
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

export default withRouter(GameOnlineUi);

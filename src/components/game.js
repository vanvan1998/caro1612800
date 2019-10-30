import React from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import cookie from 'react-cookies';
import RoundImg from 'react-rounded-image';
import Board from './board';
import * as types from '../constants/constants';

class Game extends React.Component {
  constructor() {
    super();
    this.imagesrc = `${types.stringConnect}/uploads/account.png`;
  }

  render() {
    const st = this.props;
    const UserCookie = cookie.load('userId');
    if (st.image) {
      this.imagesrc = types.stringConnect + st.image;
    }
    if (UserCookie && st.name === '') {
      st.GetUserRequest(cookie.load('userId'));
    } else {
      if (st.token === 'err') {
        return <Redirect to="/" />;
      }
      if (st.token === '') {
        return <Redirect to="/" />;
      }
    }

    if (st.isInfo) {
      return <Redirect to="/info" />;
    }
    const history = st.history.slice(0, st.stepNumber + 1);
    const current = history[st.stepNumber];
    // temp[0] lưu giá trị i, temp[1] lưu giá trị j, temp[2] lưu giá trị loại đường thắng: 0:|; 1:--; 2:\; 3:/
    st.calculateWinner(current.squares);
    const { winner } = st;
    const { Sortvalue } = st;
    // move: danh sách mảng 123456..
    const moves = history.map((step, move) => {
      const desc = move // desc lưu "go to move ..."
        ? `Go to move [${st.col[move]}][${st.row[move].toString()}]`
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
    // giao diện
    return (
      <div className="game">
        <Card
          style={{
            boxShadow: '3px 3px 5px 5px rgb(133, 131, 131)',
            height: '675px'
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
          className="game-info"
          style={{
            boxShadow: '3px 3px 5px 5px rgb(133, 131, 131)',
            background: 'rgb(250, 215, 215)'
          }}
        >
          <div>
            <Button
              style={{
                marginLeft: '400px',
                background: 'rgb(255, 100, 110,0.8)'
              }}
              className="logoutButton"
              variant="contained"
              color="secondary"
              type="button"
              onClick={event => {
                event.preventDefault();
                st.Logout();
              }}
            >
              Log out
            </Button>
            <br />
            <center>
              <RoundImg
                imageWidth="150"
                imageHeight="150"
                roundedColor="white"
                image={this.imagesrc}
              />
            </center>
            <br />
            <div className="Username">
              Player :{' '}
              <Button
                type="button"
                style={{
                  background: 'rgba(240, 160, 160, 0.4)',
                  height: '34px '
                }}
                onClick={event => {
                  event.preventDefault();
                  // st.Login(st.username, st.password);
                  // st.GetUserRequest(cookie.load('userId'));
                  st.Info();
                }}
              >
                <h4>{st.name}</h4>
              </Button>
            </div>
            <br />
            <div>
              <h4>{status}</h4>
            </div>
            <br />
            <Button
              style={{
                background: 'rgb(255, 100, 110,0.8)',
                color: '#fff',
                margin: '10px 0px 10px 23px'
              }}
              variant="contained"
              color="secondary"
              type="button"
              className="buttonSort"
              onClick={() => st.sortClick()}
            >
              {Sortvalue}
            </Button>
            <Button
              style={{
                background: 'rgb(255, 100, 110,0.8)',
                color: '#fff',
                margin: '10px 0px 10px 23px'
              }}
              variant="contained"
              color="secondary"
              type="button"
              className="buttonSort"
              onClick={() => st.MachinePlayClick()}
            >
              {st.isMachinePlay}
            </Button>
            <ol>{moves}</ol>
          </div>
        </Card>
      </div>
    );
  }
}

export default Game;

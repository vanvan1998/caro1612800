import React from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Board from './board';

class Game extends React.Component {
  render() {
    const st = this.props;
    if (st.token === 'err') {
      return <Redirect to="/" />;
    }
    if (st.token === '') {
      return <Redirect to="/" />;
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
                    background: 'rgba(221, 221, 221, 0.4)',
                    margin: '2px'
                  }
                : {
                    fontWeight: 'normal',
                    background: 'rgba(221, 221, 221, 0.4)',
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
            background: 'rgb(240, 177, 177)'
          }}
        >
          <div>
            <Button
              style={{ marginLeft: '400px' }}
              className="logoutButton"
              variant="contained"
              color="primary"
              type="button"
              onClick={() => st.Logout()}
            >
              Log out
            </Button>
            <br />
            <div className="Username">
              Player :{' '}
              <Button
                type="button"
                style={{
                  background: 'rgba(240, 150, 150, 0.4)',
                  height: '34px '
                }}
                onClick={event => {
                  event.preventDefault();
                  // st.Login(st.username, st.password);
                  st.GetUserRequest(st.token);
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
                background: '#3f51b5',
                color: '#fff',
                margin: '10px 0px 10px 23px'
              }}
              type="button"
              className="buttonSort"
              onClick={() => st.sortClick()}
            >
              {Sortvalue}
            </Button>
            <ol>{moves}</ol>
          </div>
        </Card>
      </div>
    );
  }
}

export default Game;

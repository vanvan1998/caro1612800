import React from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
          <button
            type="button"
            style={
              st.stepNumber === move
                ? { fontWeight: 'bold' }
                : { fontWeight: 'normal' }
            }
            onClick={() => st.jumpTo(move)}
          >
            {desc}
          </button>
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
    return (
      <div className="game">
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
        <div className="game-info">
          <div className="Username">
            Người chơi :{' '}
            <Button
              type="button"
              onClick={event => {
                event.preventDefault();
                st.Login(st.username, st.password);
                st.Info();
              }}
            >
              <h3>{st.name}</h3>
            </Button>
          </div>
          <br />
          <div>
            <h4>{status}</h4>
          </div>
          <br />
          <center>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => st.Logout()}
            >
              Đăng xuất
            </Button>
          </center>
          <br />
          <button
            type="button"
            className="buttonSort"
            onClick={() => st.sortClick()}
          >
            {Sortvalue}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

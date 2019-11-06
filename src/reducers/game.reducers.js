import cookie from 'react-cookies';
import * as types from '../constants/constants';

const historyGame = [
  {
    squares: Array.from(Array(20), () => new Array(20))
  }
];

const initialState = {
  historyGame,
  stepNumber: 0,
  xIsNext: true,
  col: [0],
  row: [0],
  Sortvalue: 'sorted descending',
  temp: [],
  winner: false,
  color: 'black',
  // isInfo: false,
  typePlay: ''
};

function calculateWinner(squares, state) {
  const st = { ...state };
  st.winner = false;
  for (let i = 0; i < 20; i += 1) {
    for (let j = 0; j < 20; j += 1) {
      if (squares[i][j]) {
        if (
          squares[i][j] === squares[i][j + 1] &&
          squares[i][j] === squares[i][j + 2] &&
          squares[i][j] === squares[i][j + 3] &&
          squares[i][j] === squares[i][j + 4]
        ) {
          if (
            !(
              squares[i][j + 5] &&
              squares[i][j + 5] !== squares[i][j] &&
              squares[i][j - 1] &&
              squares[i][j - 1] !== squares[i][j]
            )
          ) {
            st.temp[0] = i;
            st.temp[1] = j;
            for (let m = 2; m < 9; m += 2) {
              st.temp[m] = i;
              st.temp[m + 1] = j + m / 2;
            }
            st.winner = squares[i][j];
            return st; // đường ngang
          }
        } else if (i < 16) {
          if (
            squares[i][j] === squares[i + 1][j] &&
            squares[i][j] === squares[i + 2][j] &&
            squares[i][j] === squares[i + 3][j] &&
            squares[i][j] === squares[i + 4][j]
          ) {
            if (i > 14 || i < 1) {
              st.temp[0] = i;
              st.temp[1] = j;
              for (let m = 2; m < 9; m += 2) {
                st.temp[m] = i + m / 2;
                st.temp[m + 1] = j;
              }
              st.winner = squares[i][j];
              return st; // đường dọc
            }
            if (
              !(
                squares[i + 5][j] &&
                squares[i + 5][j] !== squares[i][j] &&
                squares[i - 1][j] &&
                squares[i - 1][j] !== squares[i][j]
              )
            ) {
              st.temp[0] = i;
              st.temp[1] = j;
              for (let m = 2; m < 9; m += 2) {
                st.temp[m] = i + m / 2;
                st.temp[m + 1] = j;
              }
              st.winner = squares[i][j];
              return st; // đường dọc
            }
          } else if (
            squares[i][j] === squares[i + 1][j + 1] &&
            squares[i][j] === squares[i + 2][j + 2] &&
            squares[i][j] === squares[i + 3][j + 3] &&
            squares[i][j] === squares[i + 4][j + 4]
          ) {
            if (i > 14 || i < 1) {
              st.temp[0] = i;
              st.temp[1] = j;
              for (let m = 2; m < 9; m += 2) {
                st.temp[m] = i + m / 2;
                st.temp[m + 1] = j + m / 2;
              }
              st.winner = squares[i][j];
              return st; // đường chéo \
            }
            if (
              !(
                squares[i + 5][j + 5] &&
                squares[i + 5][j + 5] !== squares[i][j] &&
                squares[i - 1][j - 1] &&
                squares[i - 1][j - 1] !== squares[i][j]
              )
            ) {
              st.temp[0] = i;
              st.temp[1] = j;
              for (let m = 2; m < 9; m += 2) {
                st.temp[m] = i + m / 2;
                st.temp[m + 1] = j + m / 2;
              }
              st.winner = squares[i][j];
              return st; // đường chéo \
            }
          } else if (
            squares[i][j] === squares[i + 1][j - 1] &&
            squares[i][j] === squares[i + 2][j - 2] &&
            squares[i][j] === squares[i + 3][j - 3] &&
            squares[i][j] === squares[i + 4][j - 4]
          ) {
            if (i < 5 || i > 18) {
              st.temp[0] = i;
              st.temp[1] = j;
              for (let m = 2; m < 9; m += 2) {
                st.temp[m] = i + m / 2;
                st.temp[m + 1] = j - m / 2;
              }
              st.winner = squares[i][j];
              return st; // đường chéo /
            }
            if (
              !(
                squares[i - 5][j + 5] &&
                squares[i - 5][j + 5] !== squares[i][j] &&
                squares[i + 1][j - 1] &&
                squares[i + 1][j - 1] !== squares[i][j]
              )
            ) {
              st.temp[0] = i;
              st.temp[1] = j;
              for (let m = 2; m < 9; m += 2) {
                st.temp[m] = i + m / 2;
                st.temp[m + 1] = j - m / 2;
              }
              st.winner = squares[i][j];
              return st; // đường chéo /
            }
          }
        }
      }
    }
  }
  return st;
}

function MachinePlay(state) {
  const st = { ...state };
  const historyGametemp = st.historyGame.slice(0, st.stepNumber + 1);
  const current = historyGametemp[historyGametemp.length - 1];
  const squares = JSON.parse(JSON.stringify(current.squares));

  // tìm i,j
  const temp = [];
  temp[0] = 0;
  temp[1] = 0;
  for (let i = 0; i < 20; i += 1) {
    for (let j = 0; j < 20; j += 1) {
      if (!squares[i][j]) {
        temp[0] = i;
        temp[1] = j;
        return temp;
      }
    }
  }
  return temp;
}

function handleClick(i, j, state) {
  const st = { ...state };
  const historyGametemp = st.historyGame.slice(0, st.stepNumber + 1);
  const col = st.col.slice(0, st.stepNumber + 1);
  const row = st.row.slice(0, st.stepNumber + 1);
  const current = historyGametemp[historyGametemp.length - 1];
  const squares = JSON.parse(JSON.stringify(current.squares));
  const sttemp = calculateWinner(squares, st);
  if (sttemp.winner || squares[i][j]) {
    return st;
  }

  squares[i][j] = st.xIsNext ? 'X' : 'O';

  st.historyGame = historyGametemp.concat([
    {
      squares
    }
  ]);
  st.stepNumber = historyGametemp.length;
  st.xIsNext = !st.xIsNext;
  st.col = col.concat(i + 1);
  st.row = row.concat(j + 1);
  return st;
}

function handleClickOnlineGame(i, j, symbol, state) {
  const st = { ...state };
  const historyGametemp = st.historyGame.slice(0, st.stepNumber + 1);
  const col = st.col.slice(0, st.stepNumber + 1);
  const row = st.row.slice(0, st.stepNumber + 1);
  const current = historyGametemp[historyGametemp.length - 1];
  const squares = JSON.parse(JSON.stringify(current.squares));
  const sttemp = calculateWinner(squares, st);
  if (sttemp.winner || squares[i][j]) {
    return st;
  }

  squares[i][j] = symbol;

  st.historyGame = historyGametemp.concat([
    {
      squares
    }
  ]);
  st.stepNumber = historyGametemp.length;
  st.col = col.concat(i + 1);
  st.row = row.concat(j + 1);
  return st;
}

function jumpTo(step, state) {
  const st = { ...state };

  st.stepNumber = step;
  st.xIsNext = step % 2 === 0;
  if (state.typePlay === 'Play with computer') {
    if (!st.xIsNext) {
      const temp = MachinePlay(st);
      return handleClick(temp[0], temp[1], st);
    }
  }
  return st;
}

function onclickSort(Sortvalue, state) {
  const st = { ...state };
  if (Sortvalue === 'sorted descending') {
    st.Sortvalue = 'Sort ascending';
  } else {
    st.Sortvalue = 'sorted descending';
  }
  return st;
}

const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.boardClick: {
      if (state.typePlay === 'Play with computer') {
        const st = handleClick(action.data.i, action.data.j, state);
        if (!st.xIsNext) {
          const temp = MachinePlay(st);
          return handleClick(temp[0], temp[1], st);
        }
        return st;
      }
      return handleClick(action.data.i, action.data.j, state);
    }
    case types.goToMoveClick: {
      return jumpTo(action.data.step, state);
    }
    case types.checkWinner: {
      return calculateWinner(action.data.squares, state);
    }
    case types.sortClick: {
      return onclickSort(state.Sortvalue, state);
    }
    case types.logOut: {
      const st = { ...state };
      st.stepNumber = 0;
      st.xIsNext = true;
      st.col = [0];
      st.row = [0];
      st.Sortvalue = 'sorted descending';
      st.temp = [];
      st.winner = false;
      st.color = 'black';
      st.typePlay = '';
      cookie.remove('typePlay', { path: '/' });
      return st;
    }
    case types.isOptionsPage: {
      const st = { ...state };
      st.typePlay = '';
      cookie.remove('typePlay', { path: '/' });
      return st;
    }
    case types.handleClickOnlineGame: {
      return handleClickOnlineGame(
        action.data.i,
        action.data.j,
        action.data.symbol,
        state
      );
    }
    case types.isMachinePlay: {
      const st = jumpTo(0, state);
      st.typePlay = 'Play with computer';
      cookie.save('typePlay', st.typePlay, {
        path: '/'
      });
      return st;
    }
    case types.isNomalPlay: {
      const st = jumpTo(0, state);
      st.typePlay = 'Play nomal';
      cookie.save('typePlay', st.typePlay, {
        path: '/'
      });
      return st;
    }
    case types.isCreateNewGame: {
      const st = jumpTo(0, state);
      st.typePlay = 'Create new game';
      cookie.save('typePlay', st.typePlay, {
        path: '/'
      });
      return st;
    }
    case types.isPlayNow: {
      const st = jumpTo(0, state);
      st.typePlay = 'Play now';
      cookie.save('typePlay', st.typePlay, {
        path: '/'
      });
      return st;
    }
    case types.setTypePlay: {
      const st = { ...state };
      st.typePlay = cookie.load('typePlay');
      return st;
    }
    default:
      return state;
  }
};

export default GameReducer;

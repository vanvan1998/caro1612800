import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Game from '../components/game';

const mapStateToProps = state => {
  const GameState = state.GameReducer;
  const InfoState = state.LoginReducer;
  return {
    history: GameState.history,
    stepNumber: GameState.stepNumber,
    xIsNext: GameState.xIsNext,
    col: GameState.col,
    row: GameState.row,
    Sortvalue: GameState.Sortvalue,
    temp: GameState.temp,
    winner: GameState.winner,
    name: state.LoginReducer.name,
    token: state.LoginReducer.token,
    username: InfoState.username,
    password: InfoState.password,
    isInfo: GameState.isInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (i, j) => {
      dispatch(actions.boardClick(i, j));
    },
    jumpTo: step => {
      dispatch(actions.goToMoveClick(step));
    },
    sortClick: () => {
      dispatch(actions.sortClick());
    },
    calculateWinner: squares => {
      dispatch(actions.checkWinner(squares));
    },
    Logout: () => {
      dispatch(actions.LogOut());
    },
    Info: () => {
      dispatch(actions.Info());
    },
    Login: (username, password) => {
      dispatch(actions.loginRequest(username, password));
    }
  };
};
const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;

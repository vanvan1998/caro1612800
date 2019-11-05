import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Game from '../components/game';

const mapStateToProps = state => {
  const GameState = state.GameReducer;
  const InfoState = state.LoginReducer;
  return {
    historyGame: GameState.historyGame,
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
    // isInfo: GameState.isInfo,
    isMachinePlay: GameState.isMachinePlay,
    image: InfoState.image,
    isOptions: state.OptionsReducer.isOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GetUserRequest: token => {
      dispatch(actions.GetUserRequest(token));
    },

    handleClick: (i, j) => {
      dispatch(actions.BoardClick(i, j));
    },

    jumpTo: step => {
      dispatch(actions.GoToMoveClick(step));
    },

    sortClick: () => {
      dispatch(actions.SortClick());
    },

    calculateWinner: squares => {
      dispatch(actions.CheckWinner(squares));
    },

    MachinePlayClick: () => {
      dispatch(actions.IsMachinePlay());
    },

    IsOptionsPage: () => {
      dispatch(actions.IsOptionsPage());
    },

    Logout: () => {
      dispatch(actions.LogOut());
    },

    // Info: () => {
    //   dispatch(actions.Info());
    // },

    SetTypePlay: () => {
      dispatch(actions.SetTypePlay());
    }
  };
};
const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;

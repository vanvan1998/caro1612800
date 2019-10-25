import { connect } from 'react-redux';
import Info from '../components/info';
import * as actions from '../actions/actions';

const mapStateToProps = state => {
  const InfoState = state.LoginReducer;
  return {
    username: InfoState.username,
    email: InfoState.email,
    name: InfoState.name,
    dateOfBirth: InfoState.dateOfBirth,
    sex: InfoState.sex,
    isLogin: InfoState.isLogin,
    password: InfoState.password,
    isGame: state.InFoReducer.isGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Login: (username, password) => {
      dispatch(actions.loginRequest(username, password));
    },
    IsGame: () => {
      dispatch(actions.PlayGame());
    },
    NoPlayGame: () => {
      dispatch(actions.NoPlayGame());
    },
    NoInfo: () => {
      dispatch(actions.NoInfo());
    }
  };
};

const InfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);

export default InfoContainer;

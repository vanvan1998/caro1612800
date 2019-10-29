import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Login from '../components/login';

const mapStateToProps = state => {
  const LoginState = state.LoginReducer;
  return {
    username: LoginState.username,
    password: LoginState.password,
    isLogin: LoginState.isLogin,
    token: LoginState.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GetUserRequest: token => {
      dispatch(actions.GetUserRequest(token));
    },
    Login: (username, password) => {
      dispatch(actions.loginRequest(username, password));
    }
  };
};
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;

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
    id: InfoState.id,
    isGame: state.InFoReducer.isGame,
    isUpdate: InfoState.isUpdate
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
    },
    NoUpdateUser: () => {
      dispatch(actions.NoUpdateUser());
    },
    UpdateUser: (id, username, name, email, dateOfBirth, sex, password) => {
      dispatch(
        actions.UpdateUserRequest(
          id,
          username,
          name,
          email,
          dateOfBirth,
          sex,
          password
        )
      );
    }
  };
};

const InfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);

export default InfoContainer;

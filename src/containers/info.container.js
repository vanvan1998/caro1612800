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
    isUpdate: InfoState.isUpdate,
    token: InfoState.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
    GetUserRequest: token => {
      dispatch(actions.GetUserRequest(token));
    },
    UpdateUser: (
      id,
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password,
      conformPassword
    ) => {
      dispatch(
        actions.UpdateUserRequest(
          id,
          username,
          name,
          email,
          dateOfBirth,
          sex,
          password,
          conformPassword
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

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
    token: InfoState.token,
    statusUploadImage: state.InFoReducer.statusUploadImage,
    image: InfoState.image
  };
};

const mapDispatchToProps = dispatch => {
  return {
    IsGame: () => {
      dispatch(actions.PlayGame());
    },
    IsOptionsPage: () => {
      dispatch(actions.IsOptionsPage());
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
    UploadImageRequest: (formdata, token) => {
      dispatch(actions.UploadImageRequest(formdata, token));
    },
    NoStatusImage: () => {
      dispatch(actions.NoStatusImage());
    },
    UpdateUser: (
      id,
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password,
      conformPassword,
      token
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
          conformPassword,
          token
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

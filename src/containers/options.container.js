import { connect } from 'react-redux';
import Options from '../components/options';
import * as actions from '../actions/actions';

const mapStateToProps = state => {
  const GameState = state.GameReducer;
  const InfoState = state.LoginReducer;
  return {
    name: state.LoginReducer.name,
    token: state.LoginReducer.token,
    username: InfoState.username,
    password: InfoState.password,
    image: InfoState.image,
    isInfo: GameState.isInfo,
    typePlay: GameState.typePlay,
    isOptions: state.OptionsReducer.isOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    IsOptionsPage: () => {
      dispatch(actions.IsOptionsPage());
    },
    GetUserRequest: token => {
      dispatch(actions.GetUserRequest(token));
    },
    Logout: () => {
      dispatch(actions.LogOut());
    },
    Info: () => {
      dispatch(actions.Info());
    },

    MachinePlayClick: () => {
      dispatch(actions.IsMachinePlay());
    },

    NomalPlayClick: () => {
      dispatch(actions.IsNomalPlay());
    }
  };
};
const OptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);

export default OptionsContainer;

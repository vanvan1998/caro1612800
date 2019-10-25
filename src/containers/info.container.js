import { connect } from 'react-redux';
import Info from '../components/info';

const mapStateToProps = state => {
  const InfoState = state.LoginReducer;
  return {
    username: InfoState.username,
    email: InfoState.email,
    name: InfoState.name,
    dateOfBirth: InfoState.dateOfBirth,
    sex: InfoState.sex,
    isLogin: InfoState.isLogin
  };
};

const InfoContainer = connect(mapStateToProps)(Info);

export default InfoContainer;

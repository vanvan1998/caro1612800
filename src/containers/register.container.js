import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Register from '../components/register';

const mapStateToProps = state => {
  const RegisterState = state.RegisterReducer;
  return {
    username: RegisterState.username,
    password: RegisterState.password,
    isRegister: RegisterState.isRegister,
    CheckLoadRegister: RegisterState.CheckLoadRegister,
    err: RegisterState.err
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Register: (
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password,
      confirmPassword
    ) => {
      dispatch(
        actions.registerRequest(
          username,
          name,
          email,
          dateOfBirth,
          sex,
          password,
          confirmPassword
        )
      );
    }
  };
};
const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;

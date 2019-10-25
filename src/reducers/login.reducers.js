import * as types from '../constants/constants';

const initialState = {
  username: '',
  password: '',
  isLogin: false,
  token: '',
  name: '',
  email: '',
  dateOfBirth: '',
  sex: ''
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login: {
      const st = { ...state };
      st.username = action.data.username;
      st.password = action.data.password;
      try {
        st.token = action.data.res.data.token;
        st.name = action.data.res.data.user.name;
        st.email = action.data.res.data.user.email;
        st.dateOfBirth = action.data.res.data.user.dateOfBirth;
        st.sex = action.data.res.data.user.sex;
        st.isLogin = true;
      } catch (err) {
        st.token = 'err';
      }
      return st;
    }
    case types.logOut: {
      const st = { ...state };
      st.username = '';
      st.token = '';
      st.isLogin = false;
      st.name = '';
      st.password = '';
      st.dateOfBirth = '';
      st.sex = '';
      return st;
    }
    default:
      return state;
  }
};

export default LoginReducer;

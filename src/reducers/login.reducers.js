import * as types from '../constants/constants';

const initialState = {
  username: '',
  password: '',
  isLogin: false,
  token: '',
  name: '',
  email: '',
  dateOfBirth: '',
  sex: '',
  id: '',
  isUpdate: ''
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login: {
      const st = { ...state };
      st.username = action.data.username;
      st.password = action.data.password;
      try {
        st.token = action.data.res.data.token;
        st.name = action.data.res.data.userModified.name;
        st.email = action.data.res.data.userModified.email;
        st.dateOfBirth = action.data.res.data.userModified.dateOfBirth;
        st.sex = action.data.res.data.userModified.sex;
        // eslint-disable-next-line no-underscore-dangle
        st.id = action.data.res.data.userModified._id;
        st.isLogin = true;
        localStorage.setItem('user', st.token);
      } catch (err) {
        st.token = 'err';
      }
      return st;
    }
    case types.getUser: {
      // todo
      const st = { ...state };
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
    case types.updateUser: {
      const st = { ...state };
      st.username = action.data.username;
      st.password = action.data.password;
      try {
        const temp = action.data.res.data.success;
        if (temp === 'success') {
          st.isUpdate = 'true';
        }
      } catch (err) {
        st.isUpdate = 'false';
      }
      return st;
    }
    case types.noUpdateUser: {
      const st = { ...state };
      st.isUpdate = '';
      return st;
    }
    default:
      return state;
  }
};

export default LoginReducer;

import cookie from 'react-cookies';
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
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
        // cookie.save('userId', st.token, { path: '/' });
        cookie.save('userId', st.token, {
          path: '/',
          expires
        });
        st.email = action.data.res.data.userModified.email;
        st.dateOfBirth = action.data.res.data.userModified.dateOfBirth;
        st.sex = action.data.res.data.userModified.sex;
        // eslint-disable-next-line no-underscore-dangle
        st.id = action.data.res.data.userModified._id;
        st.isLogin = true;
      } catch (err) {
        st.token = 'err';
      }
      return st;
    }
    case types.getUser: {
      const st = { ...state };
      try {
        st.token = action.data.token;
        st.username = action.data.res.data.username;
        st.name = action.data.res.data.name;
        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
        // cookie.save('userId', st.token, { path: '/' });
        cookie.save('userId', st.token, {
          path: '/',
          expires
        });
        st.email = action.data.res.data.email;
        st.dateOfBirth = action.data.res.data.dateOfBirth;
        st.sex = action.data.res.data.sex;
        // eslint-disable-next-line no-underscore-dangle
        st.id = action.data.res.data._id;
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
      cookie.remove('userId', { path: '/' });
      return st;
    }
    case types.updateUser: {
      const st = { ...state };
      st.username = action.data.username;
      st.password = action.data.password;
      st.email = action.data.email;
      st.dateOfBirth = action.data.dateOfBirth;
      st.sex = action.data.sex;
      try {
        st.isUpdate = action.data.res.data.message;
      } catch (err) {
        st.isUpdate = action.data.res.response.data.message;
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

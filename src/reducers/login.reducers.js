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
  image: '',
  id: '',
  isUpdate: ''
};

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login: {
      const st = { ...state };
      st.username = action.data.username;
      st.password = action.data.password;
      try {
        // eslint-disable-next-line no-underscore-dangle
        st.id = action.data.res.data.userModified._id;
        st.token = action.data.res.data.token;
        st.name = action.data.res.data.userModified.name;
        st.image = action.data.res.data.userModified.userImage;
        st.email = action.data.res.data.userModified.email;
        st.dateOfBirth = action.data.res.data.userModified.dateOfBirth;
        st.sex = action.data.res.data.userModified.sex;
        st.isLogin = true;
        setCookie('token', action.data.res.data.token, 7);
        // eslint-disable-next-line no-underscore-dangle
        setCookie('id', action.data.res.data.userModified._id, 7);
        setCookie('name', action.data.res.data.userModified.name, 7);
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
        st.image = action.data.res.data.userImage;
        st.email = action.data.res.data.email;
        st.dateOfBirth = action.data.res.data.dateOfBirth;
        st.sex = action.data.res.data.sex;
        // eslint-disable-next-line no-underscore-dangle
        st.id = action.data.res.data._id;
        // eslint-disable-next-line no-underscore-dangle
        setCookie('id', action.data.res.data._id, 7);
        setCookie('name', action.data.res.data.name, 7);
        st.isLogin = true;
      } catch (err) {
        st.token = 'err';
      }
      return st;
    }
    case types.loginWithFacebook: {
      const st = { ...state };
      try {
        st.token = action.data.res.data.token;
        st.name = action.data.res.data.userModified.name;
        st.image = action.data.res.data.userModified.userImage;
        st.email = action.data.res.data.userModified.email;
        st.dateOfBirth = action.data.res.data.userModified.dateOfBirth;
        st.sex = action.data.res.data.userModified.sex;
        // eslint-disable-next-line no-underscore-dangle
        st.id = action.data.res.data.userModified._id;
        st.isLogin = true;
        setCookie('token', action.data.res.data.token, 7);
        // eslint-disable-next-line no-underscore-dangle
        setCookie('id', action.data.res.data.userModified._id, 7);
        setCookie('name', action.data.res.data.userModified.name, 7);
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
      st.image = '';
      cookie.remove('token', { path: '/' });
      cookie.remove('typePlay', { path: '/' });
      cookie.remove('id', { path: '/' });
      cookie.remove('name', { path: '/' });
      cookie.remove('idPlayer1', { path: '/' });
      return st;
    }
    case types.updateUser: {
      const st = { ...state };
      st.username = action.data.username;
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

import * as types from '../constants/constants';

const axios = require('axios');

export const checkWinner = squares => {
  return {
    type: types.checkWinner,
    data: { squares }
  };
};

export const boardClick = (i, j) => {
  return {
    type: types.boardClick,
    data: { i, j }
  };
};

export const goToMoveClick = step => {
  return {
    type: types.goToMoveClick,
    data: { step }
  };
};

export const sortClick = () => {
  return {
    type: types.sortClick
  };
};

function OnclickLogin(username, password) {
  const res = axios
    .post('https://restful1612800.herokuapp.com/users/login', {
      username,
      password
    })
    .catch(error => {
      return error;
    });
  return res;
}

export const login = (username, password, res) => {
  return {
    type: types.login,
    data: { username, password, res }
  };
};

export const loginRequest = (username, password) => {
  return dispatch => {
    return OnclickLogin(username, password).then(res => {
      dispatch(login(username, password, res));
    });
  };
};

function OnclickRegister(username, name, email, dateOfBirth, sex, password) {
  const res = axios
    .post('https://restful1612800.herokuapp.com/users/register', {
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password
    })
    .catch(error => {
      return error;
    });
  return res;
}

export const register = (
  username,
  name,
  email,
  dateOfBirth,
  sex,
  password,
  res
) => {
  return {
    type: types.register,
    data: { username, name, email, dateOfBirth, sex, password, res }
  };
};

export const registerRequest = (
  username,
  name,
  email,
  dateOfBirth,
  sex,
  password
) => {
  return dispatch => {
    return OnclickRegister(
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password
    ).then(res => {
      dispatch(
        register(username, name, email, dateOfBirth, sex, password, res)
      );
    });
  };
};

export const LogOut = () => {
  return {
    type: types.logOut
  };
};

export const Info = () => {
  return {
    type: types.info
  };
};

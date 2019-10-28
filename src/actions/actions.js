import * as types from '../constants/constants';

const axios = require('axios');

export const checkWinner = squares => {
  return {
    type: types.checkWinner,
    data: { squares }
  };
};

export const IsMachinePlay = () => {
  return {
    type: types.isMachinePlay
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
    .post('https://restful1612800.herokuapp.com/api/login', {
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

function OnclickRegister(
  username,
  name,
  email,
  dateOfBirth,
  sex,
  password,
  confirmPassword
) {
  const res = axios
    .post('https://restful1612800.herokuapp.com/api/register', {
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password,
      confirmPassword
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
  confirmPassword,
  res
) => {
  return {
    type: types.register,
    data: {
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password,
      confirmPassword,
      res
    }
  };
};

export const registerRequest = (
  username,
  name,
  email,
  dateOfBirth,
  sex,
  password,
  confirmPassword
) => {
  return dispatch => {
    return OnclickRegister(
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password,
      confirmPassword
    ).then(res => {
      dispatch(
        register(
          username,
          name,
          email,
          dateOfBirth,
          sex,
          password,
          confirmPassword,
          res
        )
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

export const PlayGame = () => {
  return {
    type: types.playGame
  };
};

export const NoPlayGame = () => {
  return {
    type: types.noPlayGame
  };
};

export const NoInfo = () => {
  return {
    type: types.noInfo
  };
};

function OnclickUpdateUser(
  id,
  username,
  name,
  email,
  dateOfBirth,
  sex,
  password,
  confirmPassword
) {
  const res = axios
    .post('https://restful1612800.herokuapp.com/api/users/update', {
      _id: id,
      username,
      name,
      email,
      dateOfBirth,
      sex,
      newPassword: password,
      confirmNewPassword: confirmPassword
    })
    .catch(error => {
      return error;
    });
  return res;
}

export const UpdateUser = (
  id,
  username,
  name,
  email,
  dateOfBirth,
  sex,
  password,
  confirmPassword,
  res
) => {
  return {
    type: types.updateUser,
    data: {
      id,
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password,
      confirmPassword,
      res
    }
  };
};

export const UpdateUserRequest = (
  id,
  username,
  name,
  email,
  dateOfBirth,
  sex,
  password,
  confirmPassword
) => {
  return dispatch => {
    return OnclickUpdateUser(
      id,
      username,
      name,
      email,
      dateOfBirth,
      sex,
      password,
      confirmPassword
    ).then(res => {
      dispatch(
        UpdateUser(
          id,
          username,
          name,
          email,
          dateOfBirth,
          sex,
          password,
          confirmPassword,
          res
        )
      );
    });
  };
};

export const NoUpdateUser = () => {
  return {
    type: types.noUpdateUser
  };
};

function OnclickGetUser(token) {
  const res = axios
    .get('https://restful1612800.herokuapp.com/api/users/me', {
      headers: { Authorization: `bearer ${token}` }
    })
    .catch(error => {
      return error;
    });
  return res;
}

export const GetUser = (token, res) => {
  return {
    type: types.getUser,
    data: { token, res }
  };
};

export const GetUserRequest = token => {
  return dispatch => {
    return OnclickGetUser(token).then(res => {
      dispatch(GetUser(token, res));
    });
  };
};

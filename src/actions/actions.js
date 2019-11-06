import * as types from '../constants/constants';

const axios = require('axios');

export const CheckWinner = squares => {
  return {
    type: types.checkWinner,
    data: { squares }
  };
};

export const HandleClickOnlineGame = (i, j, symbol) => {
  return {
    type: types.handleClickOnlineGame,
    data: { i, j, symbol }
  };
};

export const IsMachinePlay = () => {
  return {
    type: types.isMachinePlay
  };
};

export const IsNomalPlay = () => {
  return {
    type: types.isNomalPlay
  };
};

export const IsCreateNewGame = () => {
  return {
    type: types.isCreateNewGame
  };
};

export const IsPlayNow = () => {
  return {
    type: types.isPlayNow
  };
};

export const SetTypePlay = () => {
  return {
    type: types.setTypePlay
  };
};

export const IsOptionsPage = () => {
  return {
    type: types.isOptionsPage
  };
};

export const NoStatusImage = () => {
  return {
    type: types.noStatusImage
  };
};

export const BoardClick = (i, j) => {
  return {
    type: types.boardClick,
    data: { i, j }
  };
};

export const GoToMoveClick = step => {
  return {
    type: types.goToMoveClick,
    data: { step }
  };
};

export const SortClick = () => {
  return {
    type: types.sortClick
  };
};

function OnclickLogin(username, password) {
  const res = axios
    .post(`${types.stringConnect}/api/auth/login`, {
      username,
      password
    })
    .catch(error => {
      return error;
    });
  return res;
}

export const Login = (username, password, res) => {
  return {
    type: types.login,
    data: { username, password, res }
  };
};

export const LoginRequest = (username, password) => {
  return dispatch => {
    return OnclickLogin(username, password).then(res => {
      dispatch(Login(username, password, res));
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
    .post(`${types.stringConnect}/api/auth/register`, {
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

// export const Info = () => {
//   return {
//     type: types.info
//   };
// };

// export const PlayGame = () => {
//   return {
//     type: types.playGame
//   };
// };

// export const NoInfo = () => {
//   return {
//     type: types.noInfo
//   };
// };

function OnclickUpdateUser(
  id,
  username,
  name,
  email,
  dateOfBirth,
  sex,
  password,
  confirmPassword,
  token
) {
  const res = axios
    .post(
      `${types.stringConnect}/api/users/update`,
      {
        _id: id,
        username,
        name,
        email,
        dateOfBirth,
        sex,
        newPassword: password,
        confirmNewPassword: confirmPassword
      },
      {
        headers: { Authorization: `bearer ${token}` }
      }
    )
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
  token,
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
      token,
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
  confirmPassword,
  token
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
      confirmPassword,
      token
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
          token,
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
    .get(`${types.stringConnect}/api/users/me`, {
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

function OnclickUploadImage(formdata, token) {
  const res = axios
    .post(`${types.stringConnect}/api/uploads/image`, formdata, {
      headers: { Authorization: `bearer ${token}` }
    })
    .catch(error => {
      return error;
    });
  return res;
}

export const UploadImage = (formdata, token, res) => {
  return {
    type: types.uploadImage,
    data: { formdata, res }
  };
};

export const UploadImageRequest = (formdata, token) => {
  return dispatch => {
    return OnclickUploadImage(formdata, token).then(res => {
      dispatch(UploadImage(formdata, token, res));
    });
  };
};

function OnclickLoginWithFacebook(accessToken, userID) {
  // const url = 'https://restful1612800.herokuapp.com';
  const url = 'http://localhost:3000';
  const res = axios
    .post(`${url}/api/auth/login-with-facebook`, {
      accessToken,
      userID
    })
    .catch(error => {
      return error;
    });
  return res;
}

export const LoginWithFacebook = (accessToken, userID, res) => {
  return {
    type: types.loginWithFacebook,
    data: { accessToken, userID, res }
  };
};

export const LoginWithFacebookRequest = (accessToken, userID) => {
  return dispatch => {
    return OnclickLoginWithFacebook(accessToken, userID).then(res => {
      dispatch(LoginWithFacebook(accessToken, userID, res));
    });
  };
};

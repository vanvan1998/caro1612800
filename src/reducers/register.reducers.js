import * as types from '../constants/constants';

const initialState = {
  username: '',
  password: '',
  isRegister: false,
  CheckLoadRegister: false,
  err: ''
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.register: {
      const st = { ...state };
      st.username = action.data.username;
      st.password = action.data.password;
      try {
        st.name = action.data.res.data.name;
        st.isRegister = true;
      } catch (err) {
        st.err = action.data.res.response.data.message;
        st.CheckLoadRegister = true;
      }
      return st;
    }
    default:
      return state;
  }
};

export default RegisterReducer;

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
      // console.log('status', action.data.res.status.message); im coi boos theer hieenj
      st.name = action.data.res.response.data.name;
      if (st.name === null) {
        st.isRegister = true;
      } else {
        console.log('data', action.data.res.response.data);
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

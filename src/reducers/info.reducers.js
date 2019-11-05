import * as types from '../constants/constants';

const initialState = {
  isGame: false,
  statusUploadImage: ''
};

const InfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.playGame: {
      const st = { ...state };
      st.isGame = true;
      return st;
    }
    case types.noStatusImage: {
      const st = { ...state };
      st.statusUploadImage = '';
      return st;
    }
    case types.uploadImage: {
      const st = { ...state };
      try {
        st.statusUploadImage = action.data.res.data.message;
      } catch (err) {
        st.statusUploadImage = action.data.res.response.data.message;
      }
      return st;
    }
    default:
      return state;
  }
};

export default InfoReducer;

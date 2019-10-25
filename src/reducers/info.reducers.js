import * as types from '../constants/constants';

const initialState = {
  isGame: false
};

const InfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.playGame: {
      const st = { ...state };
      st.isGame = true;
      return st;
    }
    case types.noPlayGame: {
      const st = { ...state };
      st.isGame = false;
      return st;
    }
    default:
      return state;
  }
};

export default InfoReducer;

import * as types from '../constants/constants';

const initialState = {
  isOptions: false
};

const OptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.isOptionsPage: {
      const st = { ...state };
      if (st.isOptions) {
        st.isOptions = false;
        return st;
      }
      st.isOptions = true;
      return st;
    }
    default:
      return state;
  }
};

export default OptionsReducer;

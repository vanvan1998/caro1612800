import { combineReducers } from 'redux';
import GameReducer from './game.reducers';
import LoginReducer from './login.reducers';
import RegisterReducer from './register.reducers';
import InFoReducer from './info.reducers';
import OptionsReducer from './options.reducer';

const myReducer = combineReducers({
  GameReducer,
  LoginReducer,
  RegisterReducer,
  InFoReducer,
  OptionsReducer
});
export default myReducer;

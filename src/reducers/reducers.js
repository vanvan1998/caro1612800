import { combineReducers } from 'redux';
import GameReducer from './game.reducers';
import LoginReducer from './login.reducers';
import RegisterReducer from './register.reducers';
import InFoReducer from './info.reducers';

const myReducer = combineReducers({
  GameReducer,
  LoginReducer,
  RegisterReducer,
  InFoReducer
});
export default myReducer;

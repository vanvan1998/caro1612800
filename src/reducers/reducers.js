import { combineReducers } from 'redux';
import GameReducer from './game.reducers';
import LoginReducer from './login.reducers';
import RegisterReducer from './register.reducers';

const myReducer = combineReducers({
  GameReducer,
  LoginReducer,
  RegisterReducer
});
export default myReducer;

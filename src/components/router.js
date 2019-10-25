import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GameContainer from '../containers/game.container';
import LoginContainer from '../containers/login.container';
import RegisterContainer from '../containers/register.container';
import InfoContainer from '../containers/info.container';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <Route path="/info">
            <InfoContainer />
          </Route>
          <Route path="/register">
            <RegisterContainer />
          </Route>
          <Route path="/">
            <GameContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

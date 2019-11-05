import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GameContainer from '../containers/game.container';
import LoginContainer from '../containers/login.container';
import RegisterContainer from '../containers/register.container';
import InfoContainer from '../containers/info.container';
import RuleContainer from '../containers/rule.containers';
import OptionsContainer from '../containers/options.container';
import GameOnlineContainer from '../containers/gameonline.container';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/info">
            <InfoContainer />
          </Route>
          <Route path="/gameonline">
            <GameOnlineContainer />
          </Route>
          <Route path="/rule">
            <RuleContainer />
          </Route>
          <Route path="/register">
            <RegisterContainer />
          </Route>
          <Route path="/game">
            <GameContainer />
          </Route>
          <Route path="/options">
            <OptionsContainer />
          </Route>
          <Route path="/">
            <LoginContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

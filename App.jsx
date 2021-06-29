import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { View } from 'react-native';
import IndexView from './src/ui/views/index';
import GameView from './src/ui/views/game';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <IndexView />
        </Route>

        <Route exact path="/game">
          <GameView />
        </Route>
      </Switch>
    </Router>
  );
}

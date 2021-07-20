import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import IndexView from './src/ui/views/index';
import GameView from './src/ui/views/game';
import GameResultView from './src/ui/views/game-result';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <IndexView />
        </Route>

        <Route exact path='/game'>
          <GameView />
        </Route>

        <Route exact path='/game-result'>
          <GameResultView />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

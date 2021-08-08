import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import IndexView from './src/ui/views/index';
import GameView from './src/ui/views/game';
import GameResultView from './src/ui/views/game-result';
import allReducers from './src/reducers';

const store = createStore(allReducers);

export default function App() {


  return (  
    <Provider store={store}>
      <MemoryRouter>
        <Switch>
          <Route exact path="/">
            <IndexView />
          </Route>

          <Route exact path="/game">
            <GameView />
          </Route>

          <Route exact path="/game-result">
            <GameResultView />
          </Route>
        </Switch>
      </MemoryRouter>
    </Provider>
  );
}

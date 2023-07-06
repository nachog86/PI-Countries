import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LANDING_PAGE, HOME_PAGE } from './utils/pathRoutes.js';
import Landing from './components/Landing/Landing.js';
import Home from './components/Home/Home.js';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={HOME_PAGE}>
          <Home />
        </Route>
        <Route path={LANDING_PAGE}>
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

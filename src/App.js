import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Wrapper from "./components/wrapper";
import Login from "./components/views/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route component={Wrapper} />
        </Switch>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Details from './views/Details';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/details/:id" component={Details} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;

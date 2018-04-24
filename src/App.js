import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './common/Header/Header';
import List from './components/List/List';
import Detail from './components/Project-Detail/Detail';
import Search from './common/Search/Search';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Search />
          <Route exact path="/" component={List} />
          <Route exact path="/projects/:project_id" component={Detail} />
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route } from 'react-router-dom';
import Header from './common/Header/Header';
import List from './components/List/List';
import Detail from './components/Project-Detail/Detail';
import Search from './common/Search/Search';
import Register from './components/User/Register';
import Auth from './common/Auth/Auth';
import Callback from './common/Callback/Callback';
import history from './common/Auth/history';

const auth = new Auth();


const handleAuthentication = ({location}) => {
  console.log(location)
  if (/access_token/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  

  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Search />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />
          <Route exact path="/Register" render={(props) => <Register auth={auth} {...props} />} />
          <Route exact path="/" render={(props) => <List auth={auth} {...props} />} />
          <Route exact path="/projects/:project_id" render={(props) => <Detail auth={auth} {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;

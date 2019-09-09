import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './MainContainer'
import DataViz from './DataViz'
import MainSidebar from './MainSidebar'
import Login from './Login'
import Register from './Register'


class App extends Component {
  
  getFiles = async () => {

    try {
      const responseGetFiles = await fetch('http://localhost:8000/prepdata', {
        credentials: 'include',
        method: 'GET'
      });

      console.log(responseGetFiles, 'responseGetFiles')

      const parsedResponse = await responseGetFiles.json();

      return parsedResponse

    } catch(err) {
      console.error(err)
      return err
    }
  }

  logIn = async (loginInfo) => {

    try {

      const loginResponse = await fetch('http://localhost:8000/login', {
        method: 'POST',
        credentials: 'include',// on every request we have to send the cookie
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })


      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse.data, "THIS IS THE PARSED RESPONSE")


      // this.setState(() => {
      //   return {
      //     ...parsedResponse.data,
      //     loading: false
      //   }
      // })


      return parsedResponse

    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} logIn={this.logIn} />} />
          <Route exact path="/dataviz" render={(props) => <DataViz {...props} /> } />
          <Route exact path='/files' render={(props) => <MainContainer {...props} /> } />
          <Route exact path='/register' render={(props) => <Register {...props} /> } />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;

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
      const responseGetFiles = await fetch(`${process.env.REACT_APP_API_URL}/prepdata`, {
        credentials: 'include',
        method: 'GET'
      });

      const parsedResponse = await responseGetFiles.json();

      return parsedResponse

    } catch(err) {
      console.error(err)
      return err
    }
  }

  logIn = async (loginInfo) => {
    try {

      const loginResponse = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        credentials: 'include',// on every request we have to send the cookie
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse.data, "THIS IS THE PARSED RESPONSE")

      return parsedResponse

    } catch (err) {
      console.log(err);
    }
  }

  logOut = async () => {
    try{ 
      const logOutResponse = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      const parsedResponse = await logOutResponse.json();

      return parsedResponse
      
     } catch (err) {
      console.log(err)
      return err
    }
  }

  register = async (data) => {
    console.log(data, "HERE IS THE DATA BEING SENT OVER")
     try {

      const registerResponse = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: 'POST',
        credentials: 'include', 
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json' 
        }
      })

      const parsedResponse = await registerResponse.json();
      
      
      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} logIn={this.logIn} />} />
          <Route exact path="/dataviz" render={(props) => <DataViz {...props} logOut={this.logOut} /> } />
          <Route exact path='/files' render={(props) => <MainContainer {...props} logOut={this.logOut} /> } />
          <Route exact path='/register' render={(props) => <Register {...props} register={this.register}/> } />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;

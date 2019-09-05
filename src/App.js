import React, { Component } from 'react';
import './App.css';
import MainContainer from './MainContainer'
import DataViz from './DataViz'

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
  render() {
    return (
      <div className="App">
        <MainContainer />
        <DataViz getFiles={this.getFiles}/>
      </div>
    );
  }
}

export default App;

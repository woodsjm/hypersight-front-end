import React from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import BarGraph from '../BarGraph'
import { Dropdown, Menu } from 'semantic-ui-react'
import FileDropdown from '../FileDropdown'


class DataViz extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      selectedFileIndex: 0
    }
  }
  componentDidMount() {
    this.getFiles()

  }
  getFiles = async () => {
    const responseGetFiles = await fetch('http://localhost:8000/prepdata', {
      credentials: 'include',
      method: 'GET'
    });

    console.log(responseGetFiles, 'responseGetFiles')

    const parsedResponse = await responseGetFiles.json();

    this.setState({
      data: parsedResponse.data
    })


  }



  selectFile = (fileIndex) => {
    this.setState({
      selectedFileIndex: fileIndex
    })
  }

  render(){
    console.log(this.state, "HERE IS STATE INSIDE DATA VIZ")
    console.log(this.state.selectedFileIndex, "HERE IS THE CHOSEN FILE INDEX")
    return(
      <div>
      <div>---------------------------</div>
      <h1>Here is where the vizualizations will go</h1>
        <FileDropdown files={this.state.data} selectFile={this.selectFile} />
      {this.state.data === undefined || this.state.data.length == 0 || this.state.selectedFileIndex == undefined ? null : <BarGraph files={this.state.data} selectedFile={this.state.selectedFileIndex} />}
      </div>
      )
  }
}

export default DataViz
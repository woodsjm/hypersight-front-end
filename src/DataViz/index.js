import React from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import BarGraph from '../BarGraph'
import BarGraph2 from '../BarGraph2'
import { Dropdown, Menu } from 'semantic-ui-react'
import FileDropdown from '../FileDropdown'
import FileDropdown2 from '../FileDropdown2'


class DataViz extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      selectedFileIndex: 0,
      selectedFileIndex2: 0
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

  selectFile2 = (fileIndex) => {
    this.setState({
      selectedFileIndex2: fileIndex
    })
  }

  render(){
    
    return(
      <div>

        <div>---------------------------</div>

        <h1>Here is where the vizualizations will go</h1>

          <div>
            <FileDropdown files={this.state.data} selectFile={this.selectFile} />
            {this.state.data === undefined || this.state.data.length == 0 || this.state.selectedFileIndex == undefined ? null : <BarGraph files={this.state.data} selectedFile={this.state.selectedFileIndex} />}
          </div>

          <div>

            <FileDropdown2 files={this.state.data} selectFile2={this.selectFile2} />
            {this.state.data === undefined || this.state.data.length == 0 || this.state.selectedFileIndex2 == undefined ? null : <BarGraph2 files={this.state.data} selectedFile={this.state.selectedFileIndex2} />}

          </div>

      </div>
      )
  }
}

export default DataViz
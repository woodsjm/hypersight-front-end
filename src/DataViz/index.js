import React from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

import BarGraph from '../BarGraph'
import BarGraph2 from '../BarGraph2'
import LineChart from '../LineChart'
import LineChart2 from '../LineChart2'

import { Dropdown, Menu } from 'semantic-ui-react'

import FileDropdown from '../FileDropdown'
import FileDropdown2 from '../FileDropdown2'
import VisualizationDropdown from '../VisualizationDropdown'
import VisualizationDropdown2 from '../VisualizationDropdown2'


class DataViz extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      visualizationTypes: ["BarChart", "LineChart"],
      selectedFileIndex: 0,
      selectedFileIndex2: 0,
      selectedVisualization: "BarChart",
      selectedVisualization2: "BarChart"
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

  selectVisualization = (visualizationTypeIndex) => {
    this.setState({
      selectedVisualization: this.state.visualizationTypes[visualizationTypeIndex]
    })
  }

  selectVisualization2 = (visualizationTypeIndex) => {
    this.setState({
      selectedVisualization2: this.state.visualizationTypes[visualizationTypeIndex]
    })
  }

  render(){
    
    // Initialize variables to store selected visualizations
    let visualization;
    let visualization2;

    // Let user selection determine which visualization to render in the first visualization div
    if (this.state.selectedVisualization == "BarChart") {

      visualization = <BarGraph files={this.state.data} selectedFile={this.state.selectedFileIndex} />
    
    } else if (this.state.selectedVisualization == "LineChart") {

      visualization = <LineChart files={this.state.data} selectedFile={this.state.selectedFileIndex} />

    }

    // Let user selection determine which visualization to render in the second visualization div
    if (this.state.selectedVisualization2 == "BarChart") {

      visualization2 = <BarGraph2 files={this.state.data} selectedFile={this.state.selectedFileIndex2} />
    
    } else if (this.state.selectedVisualization2 == "LineChart") {

      visualization2 = <LineChart2 files={this.state.data} selectedFile={this.state.selectedFileIndex2} />

    }

    return(
      <div>

        <div>---------------------------</div>

        <h1>Here is where the vizualizations will go</h1>

          <div>

            <VisualizationDropdown visualizations={this.state.visualizationTypes} selectVisualization={this.selectVisualization} />
            <FileDropdown files={this.state.data} selectFile={this.selectFile} />

            {this.state.data === undefined || this.state.data.length == 0 || this.state.selectedFileIndex == undefined ? null : visualization}
         
          </div>

          <div>

            <VisualizationDropdown2 visualizations={this.state.visualizationTypes} selectVisualization={this.selectVisualization2} />
            <FileDropdown2 files={this.state.data} selectFile2={this.selectFile2} />

            {this.state.data === undefined || this.state.data.length == 0 || this.state.selectedFileIndex2 == undefined ? null : visualization2}
          
          </div>

      </div>
      )
  }
}

export default DataViz
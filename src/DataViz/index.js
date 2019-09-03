import React from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import BarGraph from '../BarGraph'


class DataViz extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.getFiles()
  }

  getFiles() {
    const getFiles = this.props.getFiles()

    getFiles.then((parsedResponse) => {
      console.log(parsedResponse, "HERE IS THE PARSED RESPONSE IN DataViz")
      if (parsedResponse.status.message == "Success") {
        this.setState({
          data: parsedResponse.data
        })
      } else {
        console.log(parsedResponse)
      }
    }).catch((err) => {
      console.log(err)
    })

    console.log(this.state, "HERE IS STATE INSIDE DATA VIZ")
  }

  render(){
    return(
      <div>
      <div>---------------------------</div>
      <h1>Here is where the vizualizations will go</h1>
      <BarGraph/>
      </div>
      )
  }
}

export default DataViz
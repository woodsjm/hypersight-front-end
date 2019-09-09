import React from 'react'


import BarGraph from '../BarGraph'
import BarGraph2 from '../BarGraph2'
import LineChart from '../LineChart'
import LineChart2 from '../LineChart2'



import FileDropdown from '../FileDropdown'
import FileDropdown2 from '../FileDropdown2'
import VisualizationDropdown from '../VisualizationDropdown'
import VisualizationDropdown2 from '../VisualizationDropdown2'

import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


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
    const responseGetFiles = await fetch(`${process.env.REACT_APP_API_URL}/prepdata`, {
      credentials: 'include',
      method: 'GET'
    });

    const parsedResponse = await responseGetFiles.json();
    this.setState({
      data: parsedResponse.data
    })
  }

  handleLogOut = async (data) => {
    const logout = this.props.logOut();

    logout.then((data) => {
      console.log(data, "HERE IS THE DATA IN LOGOUT")
      if(data.status.message === 'User successfully logged out'){
        this.props.history.push('/')
      } else {
        console.log(data)
      }
    }).catch((err) => {
      console.log(err)
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

  render(props){
    // Initialize variables to store selected visualizations
    let visualization;
    let visualization2;

    // Let user selection determine which visualization to render in the first visualization div
    if (this.state.selectedVisualization === "BarChart") {
      visualization = <BarGraph files={this.state.data} selectedFile={this.state.selectedFileIndex} />
    
    } else if (this.state.selectedVisualization === "LineChart") {
      visualization = <LineChart files={this.state.data} selectedFile={this.state.selectedFileIndex} />
    }

    // Let user selection determine which visualization to render in the second visualization div
    if (this.state.selectedVisualization2 === "BarChart") {
      visualization2 = <BarGraph2 files={this.state.data} selectedFile={this.state.selectedFileIndex2} />
    
    } else if (this.state.selectedVisualization2 === "LineChart") {
      visualization2 = <LineChart2 files={this.state.data} selectedFile={this.state.selectedFileIndex2} />
    }

    return(
      //console.log(props, "HERE ARE PROPS IN DATA VIZ")
      <div>
          <Menu pointing secondary vertical>
            <Menu.Item as={ Link } to="/">Switch User</Menu.Item>
            <Menu.Item as={ Link } to="/dataviz">Data Visualization</Menu.Item>
            <Menu.Item as={ Link } to="/register">Create New User</Menu.Item>
            <Menu.Item onClick={this.handleLogOut}>Logout</Menu.Item>
          </Menu>




        <div style={{display: 'flex', flexDirection: 'column'}}>

              <div>
                <h1>Here is where the vizualizations will go</h1>
              </div>

          
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                  <div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                      <VisualizationDropdown 
                        visualizations={this.state.visualizationTypes} 
                        selectVisualization={this.selectVisualization} 
                      />
                      <FileDropdown 
                        files={this.state.data} 
                        selectFile={this.selectFile} 
                        />
                    </div>
                    {this.state.data === undefined || this.state.data.length === 0 || this.state.selectedFileIndex === undefined ? null : visualization}
                  </div>
                  <div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                      <VisualizationDropdown2 
                        visualizations={this.state.visualizationTypes} 
                        selectVisualization={this.selectVisualization2} 
                      />
                      <FileDropdown2 
                        files={this.state.data} 
                        selectFile2={this.selectFile2} 
                      />
                    </div>
                    {this.state.data === undefined || this.state.data.length === 0 || this.state.selectedFileIndex2 === undefined ? null : visualization2}
                  </div>
              </div>

        </div>  

     </div>
    )
  }
}

export default DataViz


//<Menu pointing secondary vertical>
           // <Menu.Item as={ Link } to="/">Switch User</Menu.Item>
            //<Menu.Item as={ Link } to="/dataviz">Data Visualization</Menu.Item>
            //<Menu.Item as={ Link } to="/register">Create New User</Menu.Item>
            //<Menu.Item >Logout</Menu.Item>
         // </Menu>


// <div>

//         <div style={{display: 'flex', flexDirection: 'column'}}>

//           <div>
//             <h1>Here is where the vizualizations will go</h1>
//           </div>

          
//           <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
//               <div>
//                 <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
//                   <VisualizationDropdown 
//                     visualizations={this.state.visualizationTypes} 
//                     selectVisualization={this.selectVisualization} 
//                   />
//                   <FileDropdown 
//                     files={this.state.data} 
//                     selectFile={this.selectFile} 
//                     />
//                 </div>
//                 {this.state.data === undefined || this.state.data.length === 0 || this.state.selectedFileIndex === undefined ? null : visualization}
//               </div>
//               <div>
//                 <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
//                   <VisualizationDropdown2 
//                     visualizations={this.state.visualizationTypes} 
//                     selectVisualization={this.selectVisualization2} 
//                   />
//                   <FileDropdown2 
//                     files={this.state.data} 
//                     selectFile2={this.selectFile2} 
//                   />
//                 </div>
//                 {this.state.data === undefined || this.state.data.length === 0 || this.state.selectedFileIndex2 === undefined ? null : visualization2}
//               </div>
//           </div>

//         </div>  

//      </div>
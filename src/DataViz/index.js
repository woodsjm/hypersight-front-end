import React from 'react'


import BarGraph from '../BarGraph'
import BarGraph2 from '../BarGraph2'
import LineChart from '../LineChart'
import LineChart2 from '../LineChart2'



import FileDropdown from '../FileDropdown'
import FileDropdown2 from '../FileDropdown2'
import VisualizationDropdown from '../VisualizationDropdown'
import VisualizationDropdown2 from '../VisualizationDropdown2'

import { Menu, Button, Icon, Sidebar, Segment, Header, Divider } from 'semantic-ui-react'
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
      selectedVisualization2: "BarChart",
      visible: false
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

   toggleVisible = () => {
    this.setState({
        visible: !this.state.visible
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
      
      <div>
         
        <Menu inverted fixed="top">
                <Button className="item" onClick={this.toggleVisible}>
                  <i className="sidebar icon" />
                </Button>
               <Menu.Item>
                <img src='https://media.giphy.com/media/l41m3025MFqt6xXuo/giphy.gif' style={{width: '50px', border: '1px solid'}} />
               </Menu.Item>
               <Menu.Item style={{float: 'right'}} name="home" as={Link} to="/home">
                  <Icon name="home" />
               </Menu.Item>
            </Menu>
            
            <Sidebar.Pushable as={Segment}>
               
               <Sidebar
                visible={this.state.visible}
                as={Menu}
                animation="push"
                width="thin"
                icon="labeled"
                vertical
                inverted
              >
                <Menu.Item style={{height: '60px'}}></Menu.Item>
                <Menu.Item style={{textAlign: 'center'}} name="login" as={Link} to="/">
                  <Icon style={{float: 'left'}} name="user circle outline" />Switch User
                </Menu.Item>
                <Menu.Item style={{textAlign: 'center'}} name="home" as={Link} to="/files">
                  <Icon style={{float: 'left'}} name="folder outline" />Upload Files
                </Menu.Item>
                <Menu.Item style={{textAlign: 'center'}} name="home" as={Link} to="/dataviz">
                  <Icon style={{float: 'left'}} name="area graph" />Data Visualization
                </Menu.Item>
                <Menu.Item style={{textAlign: 'center'}} name="home" as={Link} to="/register">
                  <Icon style={{float: 'left'}} name="cog" />Create New USer
                </Menu.Item>
              </Sidebar>
                  <div style={{height: "75px"}}></div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>

                        <div>
                          <Header as='h1' icon textAlign='center'>
                            <Icon name='area chart' circular />
                            <Header.Content>Data Visualizations</Header.Content>
                          </Header>
                        </div>

                        <Divider ></Divider>

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
              <Sidebar.Pusher>
                <Segment basic style={{height: '100vh'}}>
                    <div style={{height: "50px"}}></div>
                        
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable> 
     </div>
    )
  }
}

export default DataViz



//      </div>
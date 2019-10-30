import React from 'react';
import Papa from 'papaparse';
import FileList from '../FileList'
import { Menu, Button, Icon, Sidebar, Segment, Divider, Header, Grid, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvfile: undefined,
      filename: '',
      userFiles: [],
      fileToEditIndex: null,
      new_filename: '',
      visible: false
    }

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.getUserFiles()
  }

  addFile = async () => {
    try {

      const registerResponse = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: 'POST',
        credentials: 'include', 
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json' 
        }
      })

      const parsedResponse = await registerResponse.json();

      this.getUserFiles()
      
      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  }

  deleteFile = async (fileIndex) => {
    const [ fileToDelete ] = Object.keys(this.state.userFiles[fileIndex])
    
    try {
      const deleteUserFile = await fetch(`${process.env.REACT_APP_API_URL}/delete/${fileToDelete}`, {
        method: 'Delete',
        credentials: 'include'
      })

      if (deleteUserFile.status !== 200) {
        throw Error('Delete Request Did Not Work')
      }

      const newUserFileArray = this.state.userFiles
      newUserFileArray.splice(fileIndex, 1)
      this.setState({
        userFiles: newUserFileArray
      })

    } catch (err) {
      console.log(err)
      return err
    }
  }

  editFile = async (fileIndex) => {
    const [ fileToEdit ] = Object.keys(this.state.userFiles[fileIndex])

    try {
      const editUserFile = await fetch(`${process.env.REACT_APP_API_URL}/edit/${fileToEdit}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(this.state.new_filename),
        headers: {
          'Content-Type': 'application/json' 
        }
      })

      if (editUserFile.status !== 200) {
        throw Error('Edit Request Did Not Work')
      }

      this.getUserFiles()

    } catch (err) {
      console.log(err)
      return err
    }
  }

  getUserFiles = async () => {
    const responseGetFiles = await fetch(`${process.env.REACT_APP_API_URL}/prepdata`, {
      credentials: 'include',
      method: 'GET'
    });

    const parsedResponse = await responseGetFiles.json();
    this.setState({
      userFiles: parsedResponse.data
    })
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    })
  }

  handleChangeEdit = (e) => {
    this.setState({
      [e.currentTarget.name] : e.currentTarget.value
    })
  }

  handleLogOut = async (data) => {
    const logout = this.props.logOut();

    logout.then((data) => {
      
      if(data.status.message === 'User successfully logged out'){
        this.props.history.push('/')
      } else {
        console.log(data)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  handleTitle = (e) => {
    this.setState({
      filename : e.currentTarget.value
    })
  }

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  }

  setName = (nameOfSelectedFile) => {
    console.log("SET NAME WORKING")
    this.setState({
      new_filename: nameOfSelectedFile
    })
  }

  updateData(result) {
    var data = result.data;
    this.setState({
      csvfile: data
    })
  }

  toggleVisible = () => {
    this.setState({
        visible: !this.state.visible
    })
  }

  render(props) {
    console.log(props, "HERE I AM")
    return (
      <div >

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
              
                  <Sidebar.Pusher>

                <Grid divided='vertically'>

                  {/* 
                    -------------------
                    Instructions for uploading CSV  
                    -------------------
                  */}
                    <Grid.Row columns={1}>
                      <Grid.Column> 
                      <div style={{height: '50px'}}></div>
                        <Segment style={{height: '50vh'}}>

                          <h1>Formatting Instructions For Uploads</h1>
                          <Divider></Divider>
                          <div style={{textAlign: 'center'}}>
                            <div style={{textAlign: 'justify', width: '80%', display: 'inline-block'}}>

                            <p>Hypersight currently requires a specific format for proper visualization of CSV data. There are two elements to proper visualization here: dynamic creation of legends and properly
                               scaled numerical values.</p>

                            <p>
                               In the example table below, you will notice there are both row headers and column headers. 
                               The row headers begin on row two, and the column headers begin on column two. Moreover, there are a limited number of rows and columns. A legend will be generated for the given row headers (column headers will be your X-values). Currently, Hypersight can handle a maximum of roughly 4 rows and a maximum of roughly 8 columns. </p>

                            <p>
                               Lastly, you will notice that the range of numerical values is limited. A range that is too wide will lead to improper scaling when the data is plotted. Future bug fixes - to the scaling issue - are in the pipeline.
                                </p>
                            </div>
                          </div>

                        </Segment>
                      </Grid.Column>
                    </Grid.Row>

                  {/* 
                    -------------------
                    The CSV Upload Form 
                    -------------------
                  */}

                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Segment basic style={{height: '100vh'}}>
                            <div style={{height: '50px'}}></div>

                                <div style={{margin: 'auto'}}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    
                                      <div style={{width: '350px', alignSelf: 'center'}}>
                                        


                                        <div style={{display: 'flex', flexDirection: 'column', border: '5px solid grey', width: '350px', alignSelf: 'center'}}>

                                        <h1 style={{margin: '15px', width: '250px', alignSelf: 'center'}}>Upload CSV Files</h1>

                                        <div style={{display: 'flex'}} >
                                        <div style={{margin: '20px', float: 'left'}}>
                                        <input
                                            type="file" 
                                            ref={input => {this.filesInput = input;}} 
                                            name="file" placeholder={null}
                                            onChange={this.handleChange}
                                        />
                                        </div>
                                        </div>

                                        <div style={{display: 'flex'}} >
                                        <div style={{margin: '20px', float: 'left'}}>
                                        <button onClick={this.importCSV}> Import</button>
                                        </div>
                                        </div>

                                        <div style={{display: 'flex'}} >
                                        <div style={{marginRight: '20px', marginLeft: '20px', marginTop: '5px', float: 'left'}}>
                                        <p>Name the file:</p>
                                        </div>
                                        </div>

                                        <div style={{display: 'flex'}} >
                                        <div style={{marginRight: '20px', marginLeft: '20px', float: 'left'}}>
                                        <form>
                                            <input 
                                              type="text" 
                                              name="filename" 
                                              value={this.state.filename} 
                                              onChange={this.handleTitle}/>
                                          
                                        </form>
                                        </div>
                                        </div>

                                        <div style={{margin: '20px'}}>
                                        <button onClick={this.addFile}> Submit</button>
                                        </div>


                                        </div>

                                        
                                      </div>
                                    </div>
                                    
                                    <div style={{margin: '15px'}}>
                                      <FileList 
                                        handleChangeEdit={this.handleChangeEdit} 
                                        deleteFile={this.deleteFile} 
                                        editFile={this.editFile} 
                                        userFiles={this.state.userFiles}
                                        setName={this.setName}
                                        name={this.state.new_filename}/>
                            
                                    </div>
                                    
                            </div>
                          </Segment> 
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>

      </div>
    );
  }
}

export default MainContainer;
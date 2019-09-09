import React from 'react';
import Papa from 'papaparse';
import FileList from '../FileList'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvfile: undefined,
      filename: '',
      userFiles: [],
      fileToEditIndex: null,
      new_filename: ''
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

  render(props) {
    console.log(props, "HERE IS PROPS")
    return (
      <div >
        <Menu pointing secondary vertical>
          <Menu.Item as={ Link } to="/">Switch User</Menu.Item>
          <Menu.Item as={ Link } to="/dataviz">Data Visualization</Menu.Item>
          <Menu.Item as={ Link } to="/register">Create New User</Menu.Item>
          <Menu.Item onClick={this.handleLogOut}>Logout</Menu.Item>
        </Menu>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{width: '200px', alignSelf: 'center'}}>
            <h2 style={{margin: '15px'}}>Import CSV File</h2>
            <input
                type="file" 
                ref={input => {this.filesInput = input;}} 
                name="file" placeholder={null}
                onChange={this.handleChange}
            />
            <br/>
            <br/>
            <button onClick={this.importCSV}> UPLOAD</button>
            <br/>
            <br/>
            <form>
              <label>
                Give your file a title:
                <input 
                  type="text" 
                  name="filename" 
                  value={this.state.filename} 
                  onChange={this.handleTitle}/>
              </label>
            </form>
            <button onClick={this.addFile}> Test Database</button>
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
    );
  }
}

export default MainContainer;
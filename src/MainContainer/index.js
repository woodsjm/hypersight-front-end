import React from 'react';
import Papa from 'papaparse';
import FileList from '../FileList'

class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      filename: '',
      userFiles: [],
      fileToEditIndex: null
    }

    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.getUserFiles()
  }

  addFile = async () => {
    try {

      const registerResponse = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        credentials: 'include', 
        body: JSON.stringify(this.state),
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

  deleteFile = async (fileIndex) => {
    const [ fileToDelete ] = Object.keys(this.state.userFiles[fileIndex])
    
    try {
      const deleteUserFile = await fetch(`http://localhost:8000/delete/${fileToDelete}`, {
        method: 'Delete',
        credentials: 'include'
      })

      if (deleteUserFile.status !== 200) {
        throw Error('Delete Request Did Not Work')
      }

      const deleteUserFileJson = await deleteUserFile.json()

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

  editFile = (fileToEditIndex) => {
    console.log(fileToEditIndex, "HERE IS THE FILE TO EDIT")
  }

  getUserFiles = async () => {
    const responseGetFiles = await fetch('http://localhost:8000/prepdata', {
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


  updateData(result) {
    var data = result.data;
    this.setState({
      csvfile: data
    })
  }

  render() {
    return (
      <div >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{width: '200px', alignSelf: 'center'}}>
            <h2 style={{margin: '15px'}}>Import CSV File</h2>
            <input
                type="file" ref={input => {this.filesInput = input;}} name="file" placeholder={null}
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
                <input type="text" name="filename" value={this.state.filename} onChange={this.handleTitle}/>
              </label>
            </form>
            <button onClick={this.addFile}> Test Database</button>
          </div>
        </div>
        <div style={{margin: '15px'}}>
          <FileList deleteFile={this.deleteFile} editFile={this.editFile} userFiles={this.state.userFiles}/>
        </div>
      </div>
    );
  }
}

export default MainContainer;
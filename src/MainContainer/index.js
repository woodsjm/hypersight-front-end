import React from 'react';
import Papa from 'papaparse';

class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      filename: ''
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });

  };

  addFile = async () => {
    console.log(this.state, "HERE IS STATE INSIDE ADDFILE")
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
      console.log(parsedResponse, "HERE IS THE PARSED RESPONSE")
      
      
    /*this.setState(() => {
      return {
        ...parsedResponse.data,
        loading: false
      }
    })*/
      
      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  }

  updateData(result) {
    var data = result.data;
    console.log(data);
    this.setState({
      csvfile: data
    })
  }
  handleTitle =(e) => {
    this.setState({
      filename : e.currentTarget.value
    })
  }

  render() {
    console.log(this.state.csvfile, "HERE IS THE CSV DATA INSIDE APP");
    return (
      <div >
        <h2>Import CSV File</h2>
        <input
          type="file"
          ref={input => {
            this.filesInput = input;
          }}
          name="file"
          placeholder={null}
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
    );
  }
}

export default MainContainer;
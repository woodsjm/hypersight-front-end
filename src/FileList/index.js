import React from 'react'
import { Grid, Header, Card, Button, Icon, Form } from 'semantic-ui-react'
import Popup from 'reactjs-popup'

const FileList = (props) => {

  const files = props.userFiles.map((file, i) => {

    const title = Object.keys(file)
    
    return(
      <div key={i}>
        <Card style={{backgroundColor: '#f3f3f3', margin: '20px', width: '315px'}}>
          <Card.Content style={{height: '50px', backgroundColor: '#78C7E3'}}>
            <Header style={{backgroundColor: '#78C7E3'}}>{title}</Header>
          </Card.Content> 
          <Card.Content style={{height: '150px', backgroundColor: '#DDDDDD'}}>
          </Card.Content>
          <Card.Content extra>
            <div >
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <Button inverted color='green'  onClick={props.deleteFile.bind(null, i)}>Delete File</Button>
                </div>
                <div>
                  <Popup
                    trigger={<Button icon ><Icon onClick={props.setName.bind(null, title)} name='edit'></Icon></Button>}
                    modal
                    closeOnDocumentClick
                  >
                  {close => (
                    <div>
                    <h5>CHANGE THE NAME OF THE FILE</h5>
                  
                    <Form onSubmit={props.editFile.bind(null, i)}>

                      <Form.Group >
                      <Form.Field>
                        File Name:<input type='text' value={props.name} name='new_filename' onChange={props.handleChangeEdit}/>
                      </Form.Field>
                      </Form.Group>
                      <Button>Update</Button> 

                    </Form>
                    <Button 
                      onClick={() => {
                        close();
                      }}
                    >
                      Close
                    </Button>
                    </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    )
  })

  return (
    <div>
      
      <Grid columns={2} padded>
        {files}
      </Grid>
    </div>
  )
}

export default FileList
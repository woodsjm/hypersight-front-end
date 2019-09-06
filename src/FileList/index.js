import React from 'react'
import { Grid, Header, Card, Button } from 'semantic-ui-react'

const FileList = (props) => {

  const files = props.userFiles.map((file, i) => {
    const title = Object.keys(file)
    console.log(file[title])
    return(
      <div key={i}>
        <Card style={{backgroundColor: '#f3f3f3', margin: '20px', width: '315px'}}>
          <Card.Content style={{height: '50px', backgroundColor: '#26547C'}}>
          <Header style={{backgroundColor: '#26547C'}}>{title}</Header>
          </Card.Content> 
          <Card.Content style={{height: '150px', backgroundColor: '#DDDDDD'}}>
            
          </Card.Content>

          <Card.Content extra>

          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{alignSelf: 'center'}}>
             <Button basic color='black' floated='right'>Delete</Button>
            </div>
          </div>

          </Card.Content>
        </Card>
       
      </div>
      )
  })
  return (
    <div>
      <Header as='h3' textAlign='center'>Your Files</Header>
      <Grid columns={2} padded>
        {files}
      </Grid>
    </div>
    )
}

export default FileList
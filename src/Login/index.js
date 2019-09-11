import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Menu, Sidebar, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      visible: false
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const login = this.props.logIn(this.state);

    login.then((data) => {
        
      console.log(data.status, "HERE IS THE STATUS")
      if(data.status.message === 'Successfully logged in'){
        this.props.history.push('/files')
      } else {
        console.log(data, this.props)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  toggleVisible = () => {
    this.setState({
        visible: !this.state.visible
    })
  }

  render(){
    return (
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
                <Menu.Item style={{height: '40px'}}></Menu.Item>
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
                <Segment basic style={{height: '100vh'}}>
                    <div style={{height: "50px"}}></div>
                        <div >
                        <Grid textAlign='center' verticalAlign='middle' >
                            <Grid.Column style={{maxWidth: 450}}>
                              <Header as='h1' textAlign='center'>
                              HYPERSIGHT
                              </Header>
                  
                              <Header as='h2' textAlign='center'>
                                Login
                              </Header>

                              <Form onSubmit={this.handleSubmit}>
                                <Segment stacked>
                                  Username:
                                  <Form.Input fluid icon='user' iconPosition='left' placeholder='username' type='text' name='username' onChange={this.handleChange}/>
                                  password:
                                  <Form.Input fluid icon='lock' iconPosition='left' placeholder='password' type='password' name='password' onChange={this.handleChange}/>
                                  <Button fluid size='large' type='sumbit'>Login</Button>
                                  <Message>
                                    Not a member? <Link to='/register'>Register</Link>
                                  </Message>
                                </Segment>
                              </Form>
                            </Grid.Column>
                        </Grid>
                        </div>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
      )
  }
}

export default Login;



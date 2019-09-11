import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Label, Menu, Icon, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      visible: false
    }
  }

  handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const register = this.props.register(this.state);

    register.then((data) => {
      console.log(data, "HERE IS THE DATA IN THE REGISTER COMPONENET")
      if(data.status.message === 'Success'){
        this.props.history.push('/files')
      } else {
        console.log(data)
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
                <Segment basic style={{height: '100vh'}}>
                    <div style={{height: "1px"}}></div>
                        <div >
                          <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
                          <Grid.Column style={{maxWidth: 450}}>
                            <Header as='h2' textAlign='center'>
                              Create New Account
                            </Header>
                            <Form onSubmit={this.handleSubmit}>
                                <Segment stacked>
                                Username:
                                <Form.Input placeholder='Username' type='text' name='username' onChange={this.handleChange}/>
                                Email:
                                <Form.Input placeholder='Email' type='text' name='email' onChange={this.handleChange}/>
                                Password:
                                <Form.Input placeholder='Password' type='password' name='password' onChange={this.handleChange}/>
                              

                                <a href='/'>
                                <Button fluid size='large' type='sumbit'>Submit</Button>
                                </a>
                                <Message>
                                  Already a registered user? <Link to='/'>Login</Link>
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

export default Register;
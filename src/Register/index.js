import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      email: '',
      password: ''
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

  render(){
    return (
      <div>
        <Menu pointing secondary vertical>
          <Menu.Item as={ Link } to="/">Switch User</Menu.Item>
          <Menu.Item as={ Link } to="/dataviz">Data Visualization</Menu.Item>
          <Menu.Item as={ Link } to="/register">Create New User</Menu.Item>
          <Menu.Item as={ Link } to="/logout">Logout</Menu.Item>
        </Menu>


        <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
          <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' textAlign='center'>
              Register
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
                <Button fluid size='large' type='sumbit'>Register</Button>
                </a>
                <Message>
                  Already a member? <Link to='/'>Login</Link>
                </Message>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
      )
  }
}

export default Register;
import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { authLogin } from '../../store/actions/auth'

class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  }

  render(){

    const { error, loading, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      window.location.href = "/";
    }

    return (
      <div style={{maxWidth:'600px', margin:'20px auto', padding:'10px'}}>
        <h1 style={{textAlign:'center', margin:'10px'}}>Iniciar Sesión</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            onChange={this.handleChange}
            fluid
            label='Nombre de usuario'
            placeholder='Nombre de usuario'
            id='username'
            name="username"
            type="text"
            value={username}
            />
          <Form.Input
            onChange={this.handleChange}
            fluid
            label='Contraseña'
            placeholder='Contraseña'
            id="password"
            name="password"
            type="password"
            value={password}
            />
          <div style={{textAlign:'center'}}>
            <Button type="submit" loading={loading} color="teal" circular size="large">
              Entrar
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
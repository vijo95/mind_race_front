import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { authSignup } from "../../store/actions/auth";

class Register extends Component {

  state = {
    username: "",
    password: "",
    confirmPassword: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;
    this.props.signup(username, password, confirmPassword);
  }

  render() {

    const { username, password, confirmPassword } = this.state;
    const { error, loading, token } = this.props;
    if (token) {
      window.location.href = "/"
    }

    return (
      <div style={{maxWidth:'600px', margin:'20px auto', padding:'10px'}}>
        <h1 style={{textAlign:'center', margin:'10px'}}>Registro</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            onChange={this.handleChange}
            value={username}
            fluid
            label='Nombre de usuario'
            placeholder='Nombre de usuario'
            id='username'
            name="username"
            type="text"
            />
          <Form.Input
            onChange={this.handleChange}
            value={password}
            fluid
            label='Contraseña'
            placeholder='Contraseña'
            id="password"
            name="password"
            type="password"
            />
          <Form.Input
            onChange={this.handleChange}
            value={confirmPassword}
            fluid
            label='Confirmar contraseña'
            placeholder='Confirmar contraseña'
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            />
          <div style={{textAlign:'center'}}>
            <Button type="submit" loading={loading} color="teal" circular size="large">
              Registrarse
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
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password, confirmPassword) =>
      dispatch(authSignup(username, email, password, confirmPassword))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
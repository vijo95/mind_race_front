import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import { logout } from '../../store/actions/auth'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


class Nav extends Component {
  state = { 
    activeItem: 'home',
  }


  handleItemClick = (e, { name }) => this.setState({ 
    activeItem: name,
  })

  render() {
    const { activeItem } = this.state
    const { authenticated } = this.props


    return (
      <div style={{maxWidth:'1200px', margin:'auto'}}>
        <Menu pointing secondary>
          <Menu.Item
            as={Link}
            to="/"
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
            <Menu.Menu position='right'>
            { authenticated ? 
              <>
                <Menu.Item
                  onClick={this.handleItemClick}
                >
                  <Icon size="large" name='bell' />
                </Menu.Item>
                <Menu.Item
                  onClick={this.props.logout}
                  name='salir'
                  active={activeItem === 'salir'}
                /> 
              </>:
              <>
                <Menu.Item
                  name='entrar'
                  as={Link}
                  to="/login"
                  active={activeItem === 'entrar'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='registrarse'
                  as={Link}
                  to="/register"
                  active={activeItem === 'registrarse'}
                  onClick={this.handleItemClick}
                />
              </>
            }
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav)
)
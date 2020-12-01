import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

import GuestUsername from './GuestUsername'

export default function Start() {

  return (
    <div style={{margin:'20px auto', maxWidth:'400px', padding:'10px'}}>
      <Card centered color="blue" fluid>
        <Card.Content header='Elegí como jugar' textAlign="center"/>
        <Card.Content textAlign="center">
          <GuestUsername />
          <Button as={Link} to="/login" color="teal">
            Usuario registrado
          </Button>
        </Card.Content>
        <Card.Content extra textAlign="center">
          <Card.Meta as={Link} to="/register" textAlign="center">
            <span style={{color:'#00B0FF',fontWeight:'bold'}}>
              Registrarse
            </span> es gratis 
          </Card.Meta>
        </Card.Content>
      </Card>
    </div>
  )
}

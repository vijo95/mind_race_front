import axios from 'axios'
import React, {useState} from 'react'
import { Button, Icon, Modal, Form } from 'semantic-ui-react'

import PlayerCard from './PlayerCard'
import { searchContender } from '../../../constants'

export default function Play() {

  const [open, setOpen] = useState(false)
  const [usernameSearch, setUsernameSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [error, setError] = useState(false)

  function submitSearchContender(event){
    event.preventDefault()
    if(usernameSearch.trim("") === ""){
      setError("No pude ser vacío")
      return
    }
    setLoading(true)
    axios.post(searchContender, {
      username_search: usernameSearch.trim(" ")
    }).then(res => {
      setLoading(false)
      setError(false)
      setUsersList(res.data.users_list)
    }).catch(err => {
      console.log(err);
      setLoading(false)
      setError(false)
    })
  }

  function handleUsernameSearchChange(event){
    event.preventDefault()
    setUsernameSearch(event.target.value)
  }

  return (
    <Modal
      size="tiny"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <div style={{textAlign:'center', margin:'10px'}}>
         <Button size="massive" color="teal">JUGAR</Button>
        </div>
      }
    >
      <Modal.Header>
      <Form onSubmit={submitSearchContender}>
        <Form.Field>
          <Form.Input
            error={error}
            onChange={handleUsernameSearchChange} 
            style={{marginBottom:'10px'}} size="large" 
            icon='users' iconPosition='left' placeholder='Buscar contrincante...' />
          <Button loading={loading} fluid type='submit' color="twitter">
            Buscar contrincante
          </Button>
        </Form.Field>
      </Form>
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          { usersList ? 
            usersList.map((user,index) => 
              <PlayerCard key={index}
                id={user.id}
                username={user.username}
                won={user.won}
                lost={user.lost}  
              />
            ) : null
          }
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} color="blue">
          <span style={{marginRight:'15px'}}>Contrincante al azar</span>
          <Icon name='random' />
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

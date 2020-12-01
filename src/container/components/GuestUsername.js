import axios from 'axios'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { guestCreateProfile } from '../../constants'

export default function GuestUsername() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [error, setError] = useState(false)

  function handleGuest(event){
    event.preventDefault()
    if(username.trim("") === ""){
      setError("No puede ser vacío")
      return
    }

    setLoading(true)
    const alphanumeric = 'qwertyuiopasdfghjklzxcvbnm-0123456789'
    const id_length = Math.floor(Math.random() * 33) + 32;
    const id = randomStr(id_length,alphanumeric)
    localStorage.setItem("mind_race_guest_id",id)
    
    axios.post(guestCreateProfile,{
      guest_id: id,
      username: username
    }).then(res => {
      if (res.data.message === "taken"){
        setError(`${username} ya está en uso`)
        setLoading(false)
        localStorage.removeItem("mind_race_guest_id")
      } else {
        localStorage.removeItem("mind_race_token")
        window.location.href = "/"
      }
    }).catch(err => {
      console.log(err)
      setLoading(false)
      localStorage.removeItem("mind_race_guest_id")
    })
  }

  function randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
  }

  function handleUsernameChange(event) {
    event.preventDefault()
    setUsername(event.target.value)
  }

  return (
    <Modal
      size="mini"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>
        Usuario invitado
      </Button>}
    >
      <Modal.Header>
        <Form>
          <Form.Field>
            <label>Nombre de usuario</label>
            <Form.Input 
              error={error} 
              onChange={handleUsernameChange} 
              placeholder='Nombre de ususario' />
          </Form.Field>
          <Button onClick={handleGuest} 
            loading={loading} fluid type='submit' color="blue">
            Aceptar
          </Button>
        </Form>
      </Modal.Header>
    </Modal>
  )
}

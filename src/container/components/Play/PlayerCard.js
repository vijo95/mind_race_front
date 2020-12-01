import React, { useState, useEffect } from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { createGame } from '../../../constants'
import { authAxios } from '../../../utils'

export default function PlayerCard({id, username, won, lost}) {

  const [loading, setLoading] = useState(false)
  const [guestOrUser, setUserOrGuest] = useState(null)
  const [already, setAlready] = useState(false)
  const [same, setSame] = useState(false)
  const guest_id = localStorage.getItem("mind_race_guest_id")
  const user_token = localStorage.getItem("mind_race_token")
  
  useEffect(() => {
    if(guest_id){
      setUserOrGuest("guest")
    } else if(user_token){
      setUserOrGuest("user")
    }
  }, [])
  
  function submitChallenge(event) {
    event.preventDefault()

    setLoading(true)

    if(guestOrUser === "guest"){
      axios.post(createGame, {
        guest_or_user: guestOrUser,
        contender_id: id,
        guest_id: guest_id
      }).then(res => {
        setLoading(false)
        if (res.data.message === "already exists"){
          setAlready(true)
        } else if(res.data.message === "same player"){
          setSame(true)
        } else {
          setAlready(false)
          window.location.href = `/game/${res.data.game_id}`
        }
      }).catch(err => {
        console.log(err)
        setLoading(false)
        setAlready(false)
      })
    } else if(guestOrUser === "user") {
      authAxios.post(createGame, {
        guest_or_user: guestOrUser,
        contender_id: id,
        guest_id: guest_id
      }).then(res => {
        setLoading(false)
        if (res.data.message === "already exists"){
          setAlready(true)
        } else if(res.data.message === "same player"){
          setSame(true)
        } else {
          setAlready(false)
          window.location.href = `/game/${res.data.game_id}`
        }
      }).catch(err => {
        console.log(err)
        setLoading(false)
        setAlready(false)
        setSame(false)
      })
    }
  }

  return (
    <Card centered fluid>
      { already ? <h5 style={{margin:'5px auto', color:'#EF5350'}}>
        Ya tenés un juego en progreso con este jugador
      </h5> : same ? <h5 style={{margin:'5px auto', color:'#EF5350'}}>
        No se puede jugar con uno mismo
      </h5> : null}
      <Card.Header textAlign="center" style={{fontSize:'2rem'}} >
        {`@${username}`}
      </Card.Header>
      <Card.Content>
        <FontAwesomeIcon icon={faTrophy} color="#00C853" size="lg" 
          style={{margin:'0px 5px'}}/>{won}
        <FontAwesomeIcon icon={faTrophy} color="#FF1744" size="lg" 
          style={{margin:'0px 5px 0px 20px'}}/>{lost}
        <Button loading={loading} onClick={submitChallenge}
          color="teal" floated="right">
          Desafiar <Icon name='angle double right' />
        </Button>
      </Card.Content>
    </Card>
  )
}
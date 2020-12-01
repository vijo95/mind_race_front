import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import PlayerProgress from './PlayerProgress'
import moment from 'moment'

export default function GameCard({
  game_id, in_progress, 
  p1_progress, p2_progress,
  start_date, end_date, 
  winner, won}) {

  function cardColor(in_progress, won) {
    if(in_progress){
      return 'blue'
    } else if(won){
      return 'green'
    } else {
      return 'red'
    }
  }

  return (
    <Card color={cardColor(in_progress, won)} fluid 
      as={Link} to={`/game/${game_id}`}
      style={{maxWidth:'400px', margin:'20px auto'}}>
      <Card.Content header={
        in_progress ? "En Progresso" : won ? 'Ganador' : 'Perdedor'
        }  textAlign="center"
        style={{backgroundColor: 
          in_progress ? "#40C4FF" : won ? '#00E676' : '#F44336'}}/>
      <Card.Content>
        
        <PlayerProgress 
          winner={winner}
          progress={p1_progress}
        />

        <br/><br/>

        <PlayerProgress 
          winner={winner}
          progress={p2_progress} 
        />

      </Card.Content>
      <Card.Content extra>
        {moment(start_date).fromNow()}
        { end_date ?
          <span style={{float:'right'}}>
            {moment(end_date).fromNow()}
          </span> : null
        }
      </Card.Content>
    </Card>
  )
}

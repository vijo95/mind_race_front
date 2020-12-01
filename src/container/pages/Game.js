import React, { useState, useEffect } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import axios from 'axios'
import { connect } from "react-redux";


import GamePlayerProgress from '../components/Game/GamePlayerProgress'
import { gameInfo } from '../../constants'
import GenerateQuestion from '../components/Game/GenerateQuestion';
import { authAxios } from '../../utils';


function Game(props) {

  const [gameProgress, setGameProgress] = useState(null)

  useEffect(() => {
    const game_id = props.match.params.game_id
    const guest_id = localStorage.getItem("mind_race_guest_id")

    if(guest_id){
      axios.post(gameInfo, {
        game_id: game_id,
        guest_id: guest_id
      }).then(res => {
        setGameProgress(res.data)
      }).catch(err => {
        console.log(err);
      })
    } else {
      authAxios.post(gameInfo, {
        game_id: game_id,
        guest_id: null
      }).then(res => {
        setGameProgress(res.data)
      }).catch(err => {
        console.log(err);
      })
    }
  }, [])


  return (
    <div style={{maxWidth:'1200px', margin:'20px auto'}}>
      <Grid columns={3} stackable>
        { gameProgress ?
          <GamePlayerProgress 
            color="red" 
            progress={gameProgress[2]} 
            winner={gameProgress[8].winner}
          /> : null
        }

        <Grid.Column textAlign="center">
          { gameProgress ?
            <>
              { gameProgress[8].winner ?
                <h3>El ganador es @{gameProgress[8].winner}</h3> :
                <h3>es el turno de @{gameProgress[5].turn.username}</h3>
              }

              { gameProgress[7].my_turn ? 
                <GenerateQuestion
                game_id={parseInt(props.match.params.game_id)}
                prev_question={gameProgress[6].question}
                player_turn={gameProgress[5].turn.username}
                /> : <Button disabled>Generar Pregunta</Button>
              }
            </> : null
        }

        </Grid.Column>
        
        { gameProgress ?
          <GamePlayerProgress 
            color="blue" 
            progress={gameProgress[3]}
            winner={gameProgress[8].winner}
          /> : null
        }
      </Grid>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

export default connect(
  mapStateToProps,
)(Game);
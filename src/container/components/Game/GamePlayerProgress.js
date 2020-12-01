import React from 'react'
import { Grid, Label } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faGlobeAmericas, faFlask, faBlender,
  faPaintBrush, faFutbol, faFilm, faStar
} from '@fortawesome/free-solid-svg-icons'

export default function GamePlayerProgress({color, progress, winner}) {

  return (
    <Grid.Column textAlign="center">
      { winner === progress.player_username ?
        <h1 style={{color:'#00E676'}}>Ganador</h1> : null
      }
      <Label style={{marginBottom:'15px'}} circular color={color} size="massive">
        @{progress.player_username}
      </Label>
      <Grid.Column>
        <FontAwesomeIcon color={ 3 === progress.category1  ? "#FF6D00" : "#90A4AE"}
          icon={faFutbol}  size="2x" style={{margin:'5px 10px'}}/>
        <FontAwesomeIcon color={ 1 <= progress.category1  ? "#FF6D00" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 2 <= progress.category1 ? "#FF6D00" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 3 === progress.category1 ? "#FF6D00" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/><br/>

        <FontAwesomeIcon color={ 3 === progress.category2 ? "#00B0FF" : "#90A4AE"}
          icon={faGlobeAmericas} size="2x" style={{margin:'5px 10px'}}/>
        <FontAwesomeIcon color={ 1 <= progress.category2  ? "#00B0FF" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 2 <= progress.category2 ? "#00B0FF" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 3 === progress.category2 ? "#00B0FF" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/><br/>
        
        <FontAwesomeIcon color={ 3 === progress.category3 ? "#1DE9B6" : "#90A4AE"} 
          icon={faFlask} size="2x" style={{margin:'5px 10px'}}/>
        <FontAwesomeIcon color={ 1 <= progress.category3  ? "#1DE9B6" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 2 <= progress.category3 ? "#1DE9B6" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 3 === progress.category3 ? "#1DE9B6" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/><br/>
        
        <FontAwesomeIcon color={ 3 === progress.category4 ? "#FFD600" : "#90A4AE" }
          icon={faBlender} size="2x" style={{margin:'5px 10px'}}/>
        <FontAwesomeIcon color={ 1 <= progress.category4  ? "#FFD600" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 2 <= progress.category4 ? "#FFD600" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 3 === progress.category4 ? "#FFD600" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/><br/>
        
        <FontAwesomeIcon color={ 3 === progress.category5 ? "#FF1744" : "#90A4AE"}
          icon={faPaintBrush} size="2x" style={{margin:'5px 10px'}}/>
        <FontAwesomeIcon color={ 1 <= progress.category5  ? "#FF1744" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 2 <= progress.category5 ? "#FF1744" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 3 === progress.category5 ? "#FF1744" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/><br/>
        
        <FontAwesomeIcon color={ 3 === progress.category6 ? "#AB47BC" : "#90A4AE"} 
          icon={faFilm} size="2x" style={{margin:'5px 10px'}}/>
        <FontAwesomeIcon color={ 1 <= progress.category6  ? "#AB47BC" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 2 <= progress.category6 ? "#AB47BC" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/>
        <FontAwesomeIcon color={ 3 === progress.category6 ? "#AB47BC" : "#90A4AE"}
          icon={faStar}  size="1x" style={{margin:'10px 5px'}}/><br/>
      </Grid.Column>
    </Grid.Column>
  )
}

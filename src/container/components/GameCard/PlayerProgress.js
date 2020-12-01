import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faGlobeAmericas, faFlask, faBlender,
  faPaintBrush, faFutbol, faFilm
} from '@fortawesome/free-solid-svg-icons'

export default function PlayerProgress({progress, winner}) {
  return (
    <>
      <span style={{fontSize:'1.3rem', fontWeight:'bold', color:'#263238'}}>
        @{progress.player_username}
      </span>
      { winner === progress.player_username ? 
        <span style={{fontSize:'1.3rem', fontWeight:'bold', 
        color:'#00E676', marginLeft:'10px'}}>
          Ganador
        </span> : null
      } 
      <br/>
      <FontAwesomeIcon icon={faFutbol} 
        color={progress.category1 === 3 ? "#FF6D00" : "#90A4AE"} 
        size="2x" style={{margin:'5px 10px 5px 0px'}}/>
      
      <FontAwesomeIcon icon={faGlobeAmericas}
        color={progress.category2 === 3 ? "#00B0FF" : "#90A4AE"} 
        size="2x" style={{margin:'5px 10px'}}/>
      
      <FontAwesomeIcon icon={faFlask} 
        color={progress.category3 === 3 ? "#1DE9B6" : "#90A4AE"} 
        size="2x" style={{margin:'5px 10px'}}/>
      
      <FontAwesomeIcon icon={faBlender} 
        color={progress.category4 === 3 ? "#FFD600" : "#90A4AE"}
        size="2x" style={{margin:'5px 10px'}}/>
      
      <FontAwesomeIcon icon={faPaintBrush} 
        color={progress.category5 === 3 ? "#FF1744" : "#90A4AE"}
        size="2x" style={{margin:'5px 10px'}}/>
      
      <FontAwesomeIcon icon={faFilm} 
        color={progress.category6 === 3 ? "#AB47BC" : "#90A4AE"}
        size="2x" style={{margin:'5px 10px'}}/>
    </>
  )
}

import React, {useState} from 'react'
import { Card, Transition, Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { 
  faGlobeAmericas, faFlask, faBook,
  faPaintBrush, faFutbol, faFilm
} from '@fortawesome/free-solid-svg-icons'

import { generateQuestion } from '../../../constants'
import Question from './Question'
import { authAxios } from '../../../utils'

export default function GenerateQuestion({game_id, prev_question}) {

  const [visibility, setVisibility] = useState(false)
  const [questions, setQuestions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)


  function fetchQuestion(event) {
    event.preventDefault()
    setLoading(true)
    const guest_id = localStorage.getItem("mind_race_guest_id")

    if(guest_id){
      axios.post(generateQuestion,{
        guest_or_user: "guest",
        guest_id: guest_id,
        game_id: parseInt(game_id),
      }).then(res => {
        setQuestions(res.data)
        setVisibility(true)
        setLoading(false)
        setDisabled(true)
      }).catch(err => {
        console.log(err);
        setLoading(false)
      })
    } else {
      authAxios.post(generateQuestion, {
        guest_or_user: "user",
        guest_id: null,
        game_id: parseInt(game_id)
      }).then(res => {
        setQuestions(res.data)
        setVisibility(true)
        setLoading(false)
        setDisabled(true)
      }).catch(err => {
        console.log(err);
        setLoading(false)
      })
    }
  }

  function categoryIcon(category) {
    switch(category){
      case 1: return faFutbol
      case 2: return faGlobeAmericas
      case 3: return faFlask
      case 4: return faBook
      case 5: return faPaintBrush
      case 6: return faFilm
      default: return null
    }
  }

  function categoryColor(category){
    switch(category){
      case 1: return "#FF6D00" // Deporte
      case 2: return "#00B0FF" // Geografia
      case 3: return "#1DE9B6" // Ciencia
      case 4: return "#FFD600" // Historia
      case 5: return "#FF1744" // Arte
      case 6: return "#AB47BC" // Entretenimiento
      default: return "#90A4AE"
    }
  }


  return (
    <>
      { prev_question ?
        <Question game_id={parseInt(game_id)}
          category_icon={categoryIcon(prev_question.category_id)}
          category_color={categoryColor(prev_question.category_id)}
          prev_question={prev_question}
        /> : 
        <>
          <Button onClick={fetchQuestion} loading={loading} disabled={disabled}>
            Generar pregunta
          </Button>
          { questions ?
            <Transition.Group animation="fly down" duration="300">
              { visibility && 
                <Card centered fluid>
                  <Card.Content>
                    <FontAwesomeIcon icon={categoryIcon(questions.category_id)} 
                      color={categoryColor(questions.category_id)} 
                      size="2x" style={{margin:'5px 5px'}}
                    />
                    <h2 style={{margin:'0px'}}>{questions.category}</h2>
                  </Card.Content>

                  <Card.Content>
                    <h3>Elegí la dificultad de tu pregunta</h3>
                    <Question difficulty="easy"
                      game_id={parseInt(game_id)}

                      category_icon={categoryIcon(questions.category_id)}
                      category_color={categoryColor(questions.category_id)}
                      question={questions.question_1}
                    />
                    <Question difficulty="hard" 
                      game_id={parseInt(game_id)}

                      category_icon={categoryIcon(questions.category_id)}
                      category_color={categoryColor(questions.category_id)}
                      question_2={questions.question_2}
                    />
                  </Card.Content>

                  <Card.Content>
                    <h5 style={{color:'#607D8B'}}>
                      Si eliges difícil, tendrás otra oportunidad si fallas.
                      Si eliges fácil, perderás el turno en caso de fallar
                    </h5>
                  </Card.Content>
                </Card>
              }
            </Transition.Group> : null
          }
        </>
      }
    </>
  )
}

import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import axios from 'axios'

import GenerateQuestion from './GenerateQuestion'
import { authAxios } from '../../../utils'
import { pickQuestion, submitPickOption } from '../../../constants'
import QuestionModal from './QuestionModal'


function Question({game_id, difficulty, category_icon, category_color, prev_question,question, question_2}) {

  const [open, setOpen] = useState(false)
  const [openPrev, setOpenPrev] = useState(true)
  //const [visibility, setVisibility] = useState(false)

  function pickEasyQuestion() {
    let hardBtn = document.getElementById("hard-btn")
    hardBtn.classList.add("disabled")
    
    const guest_id = localStorage.getItem("mind_race_guest_id")

    if (guest_id){
      axios.post(pickQuestion, {
        game_id: parseInt(game_id),
        question_id: question.id,
        guest_id: guest_id
      }).then(res =>{
        if(res.data.message === "question picked"){
          window.location.href = `/game/${game_id}`
        }
      }).catch(err => {
        console.log(err);
      })
    } else {
      authAxios.post(pickQuestion, {
        game_id: parseInt(game_id),
        question_id: question.id,
        guest_id: null
      }).then(res =>{
        if(res.data.message === "question picked"){
          window.location.href = `/game/${game_id}`
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }

  function pickHardQuestion() {
    let easyBtn = document.getElementById("easy-btn")
    easyBtn.classList.add("disabled")

    const guest_id = localStorage.getItem("mind_race_guest_id")
    if (guest_id){
      axios.post(pickQuestion, {
        game_id: game_id,
        question_id: question_2.id,
        guest_id: guest_id
      }).then(res =>{
        if(res.data.message === "question picked"){
          window.location.href = `/game/${game_id}`
        }
      }).catch(err => {
        console.log(err);
      })
    } else {
      authAxios.post(pickQuestion, {
        game_id: game_id,
        question_id: question_2.id,
        guest_id: null
      }).then(res =>{
        if(res.data.message === "question picked"){
          window.location.href = `/game/${game_id}`
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }

  function pickOption(event, option) {
    event.preventDefault()
    const guest_id = localStorage.getItem("mind_race_guest_id")

    if(guest_id){
      axios.post(submitPickOption, {
        game_id: game_id,
        guest_id: guest_id,
        option_number: option
      }).then(res => {
        if(res.data.message === "correct"){
          let correctMessage = document.getElementById("correct-message")
          let generateQuestion = document.getElementById("generate-question")
          let questionsCard = document.getElementById("options")

          correctMessage.classList.remove("hideElement")
          correctMessage.classList.add("showElement")

          generateQuestion.classList.remove("hideElement")
          generateQuestion.classList.add("showElement")

          questionsCard.classList.add("hideElement")
          questionsCard.classList.remove("showElement")
        } else if(res.data.message === "wrong"){
          let wrongMessage = document.getElementById("wrong-message")
          let generateQuestion = document.getElementById("generate-question")
          let questionBtn = document.getElementById("question-btn")

          wrongMessage.classList.remove("hideElement")
          wrongMessage.classList.add("showElement")

          generateQuestion.classList.remove("hideElement")
          generateQuestion.classList.add("showElement")

          questionBtn.classList.remove("showElement")
          questionBtn.classList.add("hideElement")

          setTimeout(() => {window.location.href = `/game/${game_id}`},2000)
        } else if(res.data.message === "winner"){
          window.location.href = `/game/${game_id}`
        }
      }).catch(err => {
        console.log(err);
      })
    } else{
      authAxios.post(submitPickOption, {
        game_id: game_id,
        guest_id: guest_id,
        option_number: option
      }).then(res => {
        if(res.data.message === "correct"){
          let correctMessage = document.getElementById("correct-message")
          let generateQuestion = document.getElementById("generate-question")
          let questionsCard = document.getElementById("options")

          correctMessage.classList.remove("hideElement")
          correctMessage.classList.add("showElement")

          generateQuestion.classList.remove("hideElement")
          generateQuestion.classList.add("showElement")

          questionsCard.classList.add("hideElement")
          questionsCard.classList.remove("showElement")
        } else if(res.data.message === "wrong"){
          let wrongMessage = document.getElementById("wrong-message")
          let generateQuestion = document.getElementById("generate-question")
          let questionBtn = document.getElementById("question-btn")

          wrongMessage.classList.remove("hideElement")
          wrongMessage.classList.add("showElement")

          generateQuestion.classList.remove("hideElement")
          generateQuestion.classList.add("showElement")

          questionBtn.classList.remove("showElement")
          questionBtn.classList.add("hideElement")

          setTimeout(() => {window.location.href = `/game/${game_id}`},2000)
        } else if(res.data.message === "winner"){
          window.location.href = `/game/${game_id}`
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <> 
      { prev_question ? 
        <Modal
        size="tiny"
        open={openPrev}
        onClose={() => setOpenPrev(false)}
        onOpen={() => setOpenPrev(true)}>
          
          <QuestionModal 
            prev_question={prev_question}
            category_color={category_color}
            category_icon={category_icon}
            pickOption={pickOption}
          />

          <div id="generate-question" className="hideElement" style={{textAlign:'center', margin:'10px'}}>
            <h1 id="correct-message" className="hideElement"
              style={{color:'#00E676', fontSize:'2.5rem'}}>
                ¡Correcto!
            </h1>
            <h1 id="wrong-message" className="hideElement"
              style={{color:'#F44336', fontSize:'2.5rem'}}>
              Incorrecto...
            </h1>
            <div id="question-btn">
              <GenerateQuestion
                game_id={game_id}
                />
            </div>
          </div>

        </Modal> :
        // Question Modal NO PREV_QUESTION
        <Modal
        size="tiny"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={ difficulty === "easy" ?
            <Button id="easy-btn" size="large" color="teal" 
              onClick={pickEasyQuestion}>Fácil
            </Button> : 
            <Button id="hard-btn" size="large" color="red" 
            onClick={pickHardQuestion}>Difícil
            </Button>
          }>

          <QuestionModal
            question={question}
            question_2={question_2}
            category_color={category_color}
            category_icon={category_icon}
            pickOption={pickOption}
          />
          
          <div id="generate-question" className="hideElement" style={{textAlign:'center', margin:'10px'}}>
            <h1 id="correct-message" className="hideElement"
              style={{color:'#00E676', fontSize:'2.5rem'}}>
                ¡Correcto!
            </h1>
            <h1 id="wrong-message" className="hideElement"
              style={{color:'#F44336', fontSize:'2.5rem'}}>
              Incorrecto...
            </h1>
            <div id="question-btn">
              <GenerateQuestion
                game_id={game_id}
              />
            </div>
          </div>
        </Modal>
      }
    </>
  )
}

export default Question
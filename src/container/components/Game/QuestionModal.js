import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Header, Modal } from 'semantic-ui-react'

export default function QuestionModal({prev_question, question, question_2,
  category_color, category_icon, pickOption}) {
    
  return (
    <>
      { prev_question ? 
        <div id="options" className="showElement" style={{margin:'20px'}}>
          <Header textAlign="center">
            <FontAwesomeIcon icon={category_icon} color={category_color} 
              size="2x" style={{margin:'5px 5px'}}/>
            <h1 style={{margin:'0px'}}>{prev_question.question}</h1>
          </Header>
          <Modal.Content style={{textAlign:'center'}}>
            { prev_question.choice1 ?
              <Button fluid style={{margin:'10px'}} size="large" color="blue" 
                onClick={(event) => pickOption(event,1)}>
                {prev_question.choice1}
              </Button> : null
            }
            { prev_question.choice2 ? 
              <Button fluid style={{margin:'10px'}} size="large" color="blue" 
                onClick={(event) => pickOption(event,2)}>
                {prev_question.choice2}
              </Button> : null
            }
            { prev_question.choice3 ? 
              <Button fluid style={{margin:'10px'}} size="large" color="blue" 
                onClick={(event) => pickOption(event,3)}>
                {prev_question.choice3}
              </Button> : null
            }
          </Modal.Content>
        </div> : 
        <div id="options" className="showElement" style={{margin:'20px'}}>
          <Header textAlign="center">
            <FontAwesomeIcon icon={category_icon} color={category_color} 
              size="2x" style={{margin:'5px 5px'}}/>
              { question ? 
                <h1 style={{margin:'0px'}}>{question.question}</h1> :
                <h1 style={{margin:'0px'}}>{question_2.question}</h1>
              }
          </Header>
          <Modal.Content style={{textAlign:'center'}}>
            <Button fluid style={{margin:'10px'}} size="large" color="blue" 
              onClick={(event) => pickOption(event,1)}>
              { question && question.choice1 ? question.choice1 :
                question_2.choice1 ? question_2.choice1 : null }
            </Button>
            <Button fluid style={{margin:'10px'}} size="large" color="blue" 
              onClick={(event) => pickOption(event,2)}>
              { question && question.choice2 ? question.choice2 :
                question_2.choice2 ? question_2.choice2 : null }
            </Button>
            <Button fluid style={{margin:'10px'}} size="large" color="blue" 
              onClick={(event) => pickOption(event,3)}>
              { question && question.choice3 ? question.choice3 :
                question_2.choice3 ? question_2.choice3 : null }
            </Button>
          </Modal.Content>
        </div>
      }
    </>
  )
}

import React from "react"
import Query from "./Query"
import { nanoid } from "nanoid"
import { decode } from 'html-entities';

export default function Quiz() {
    const [quiz, setQuiz] = React.useState([])
    const [recordedAnswers, setRecordedAnswers] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState([])
    const [isAnswersChecked, setIsAnswersChecked] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [newQuiz, setNewQuiz] = React.useState(false)
    
    React.useEffect(() => {
        async function getData() {
            const url = "https://opentdb.com/api.php?amount=5&category=10&difficulty=easy&type=multiple"
            const res = await fetch(url)
            const data = await res.json()
            getQueries(data.results)
        }
        getData()
    }, [newQuiz])
    
    function getQueries(data) {
        const rightAnswers = []
        const queries = data.map(query => {
            const { question, correct_answer, incorrect_answers } = query
            rightAnswers.push(correct_answer)            
            return {
                id: nanoid(),
                question: decode(question),
                answers: shuffleAnswers(incorrect_answers, correct_answer),
                correctAnswer: correct_answer,
                userAnswer: ''
            }
        })
        setCorrectAnswers([...rightAnswers])
        setIsAnswersChecked(false)
        setCount(0)        
        setQuiz(queries)
    }
    
    function shuffleAnswers(incorrectAnswers, correctAnswer) {
        const AllAnswers = incorrectAnswers.concat(correctAnswer)
        const shuffledAnswers = AllAnswers.sort((a, b) => 0.5 - Math.random())
        const answers = shuffledAnswers.map(answer => {
            return {
                id: answer,
                value: answer,
            }
        })
        return answers 
    }
    
    function recordAnswers() {
        const userAnswers = quiz.map(query => {
            return query.userAnswer
        })
        evaluateQuiz(userAnswers)
    }
    
    function evaluateQuiz(userAnswers) {
        let internalCount = 0
        for (let i = 0; i < userAnswers.length; i++) {
            if(userAnswers[i] === correctAnswers[i]) {
                internalCount++
            }
        }
        setCount(internalCount)
        setIsAnswersChecked(true)
    }

    const queriesElements = quiz.map(query => {
        return (
            <Query
                key={query.id}
                query={query}
                quiz={quiz}
                setQuiz={setQuiz}
                isAnswersChecked={isAnswersChecked} 
            />
        )
    })

    return (
        <main>
            <img className="lemony-img" src="images/blobs-lemony2.png"/>        
            <img className="blue-img" src="images/blobs-blue2.png"/>
            <div className="queries-container">
                {queriesElements}
            </div>
            <div className="check-btn-container">
                <p>You scored {count}/5 correct answers</p>
                { !isAnswersChecked ?
                    <button onClick={recordAnswers} className="check-btn">
                        Check answers
                    </button> :
                    <button 
                        onClick={() => setNewQuiz(prev => !prev)} 
                        className="check-btn"
                    >
                        Play again ?
                    </button>
                }
            </div>
        </main>
    )
}    
    
    
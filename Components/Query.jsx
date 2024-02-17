import React from "react"
import Answer from "./Answer"

export default function Query({ query, setQuiz, isAnswersChecked }) {
    function handleChange(queryId, answerId) {
        setQuiz(prevQuiz => {
            return prevQuiz.map(query => {
                return query.id === queryId ?
                {...query, userAnswer: answerId} :
                query
            })
        })
    }
    
    const answersElements = query.answers.map(answer => {
        return (
            <Answer
                key={answer.value}
                queryId={query.id}
                correctAnswer={query.correctAnswer}
                userAnswer={query.userAnswer}
                answer={answer}
                handleChange={handleChange}
                isAnswersChecked={isAnswersChecked}
            />      
        )
    })
    
    return (
        <div className="query">
            <h2>{query.question}</h2>
            <div className="form">
                {answersElements}
            </div>
        </div> 
    )
}
    
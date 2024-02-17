import React from "react"

export default function Answer({
    answer, queryId, handleChange, userAnswer, isAnswersChecked, correctAnswer 
    }) {

    let backgroundColor = ""
    let border = ""
    let opacity = ""
    if(!isAnswersChecked) {
        backgroundColor = answer.value === userAnswer ? "#D6DBF5" : "transparent"
        border = answer.value === userAnswer   && "1px solid #D6DBF5"
           
    } else if(isAnswersChecked) {
        if (answer.value === userAnswer && answer.value !== correctAnswer) {
            backgroundColor = "#F8BCBC"
            border = "none"
            opacity= ".5"           
        }
        else if(answer.value === correctAnswer) {
            backgroundColor = "#94D7A2"
            border = "none"
        }
    }

    const styles = {
        backgroundColor,
        border,
        opacity
    }
    
    return (
        <div>
            <input 
                className="radio" 
                type="radio" 
                name="inputData"
                value={answer.value}
                id={answer.id}
                onChange={()=> handleChange(queryId, answer.id)}
                // onClick={() => setIsHeld(prev => !prev)}
                disabled={isAnswersChecked}
            />
            <label 
                className={`label`}
                htmlFor={answer.id}
                style={styles}
            >
                {answer.value}
            </label>
        </div>
    )
} 
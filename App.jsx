import React from "react"
import Intro from "./Components/Intro"
import Quiz from "./Components/Quiz"

export default function App() {
    const [isQuiz, setIzQuiz] = React.useState(false)
    
    function startQuiz() {
        setIzQuiz(prevState => !prevState)
    }
        
    return (
        <>
            {isQuiz ?
                <Quiz /> :
                <Intro handleClick={startQuiz}/>
            }
        </>
    )
}


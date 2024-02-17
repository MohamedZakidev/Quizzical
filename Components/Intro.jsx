import React from "react"

export default function Intro({ handleClick }) {
    return (
        <div className="intro">
            <img className="lemony-img" src="images/blobs-lemony.png"/>        
            <img className="blue-img" src="images/blobs-blue.png"/>
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={handleClick}>Start quiz</button>
        </div>
    )
}
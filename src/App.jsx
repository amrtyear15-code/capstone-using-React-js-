import React from "react"
import { languages } from "../language"
import generator from "/src/generatedWord"
import clsx from "clsx"
import getFarewellText  from"../utils"
export default function App(){
    
    
    const [currentWord,setcurrentWord]=React.useState(generator())
    const [GussedLetters,setGuessedLetters]=React.useState([])
    const wrongGuessCount=GussedLetters.filter(wrong=>!currentWord.includes(wrong.toUpperCase())).length
    const isGameWon = currentWord.every(letter => GussedLetters.includes(letter.toLowerCase()));
    const isGamelose = wrongGuessCount >= languages.length
    const isGameOver = isGameWon || isGamelose;
    const keyboardKeys="abcdefghijklmnopqrstuvwxyz"
    const lastGuessedLetter = GussedLetters[GussedLetters.length - 1];
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
    const win =!isGamelose
    const keyMapping = keyboardKeys.split("").map(mapping=>{
        const isGussed = GussedLetters.includes(mapping)
        const isCorrect = isGussed&&currentWord.join("").toUpperCase().includes(mapping.toUpperCase())
        const isWrong =isGussed&&!currentWord.join("").toUpperCase().includes(mapping.toUpperCase())
        const buttunClass=clsx("base-button",{
            "bg-green":isCorrect,
            "bg-red":isWrong
        })
        return(<button 
            key={mapping} 
            onClick={()=>setGuessedLetters(set=>[...set, mapping])}
            disabled={!isGameOver?GussedLetters.includes(mapping):mapping}
            className={buttunClass}
            >{mapping.toUpperCase()}</button>)})
            
            
    function startNewGame() {
        setGuessedLetters([])
    }    
        


    const language=languages.map((die,index)=>{
        const lost=index<wrongGuessCount 
        const classLost=clsx("loser", {
            "lost": lost
        })
        return (
    <h1 className={classLost} key={die.name} style={{backgroundColor:die.backgroundColor, color:die.color}}>{die.name}</h1>)
    })
    const align =currentWord.map(aligns=><span>{GussedLetters.includes(aligns.toLowerCase())?aligns.toUpperCase():""}</span>)
    const styleStatus= {
    backgroundColor: win?"greenyellow":"red",
    color: "antiquewhite",
    textShadow:" 1px 0px 2px rgb(0, 0, 0)",
    width: "28rem",
    height: "7rem",
    borderRadius: "10px"
}
    
    return(
        <>
        <h1>Assembly:End Game</h1>
        <p>Guess the word under 8 attemps<br /> to keep the psrogramming word state from assembly</p>
        <getFarewellText language={languages} />
        
        <div>
<section className="status" style={styleStatus}>
    
    {isGameOver ? (
        isGameWon ? (
            <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </>
        ) : (
            <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
    ) : 
    isLastGuessIncorrect ? (
        <p className="farewell-message">
            {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
    ) : 
    null}
</section>
        </div>
        <div className="array">{language}</div>
        <div className="letters">{align}</div>
        <div className="keyboard">{keyMapping}</div>
        {isGameOver && <button className="newGame" onClick={()=>startNewGame()} >New Game</button>}
        </>
    )
}
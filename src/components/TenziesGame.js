import React,{useEffect, useState}  from "react";
import "./TenziesGame.css";
import Die from "./Die";
import {nanoid} from "nanoid"
import Confetti  from "react-confetti";





export default function TenziesGame() {
  
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);

    useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue)
    if ( allHeld && allSameValue) {
        setTenzies(true);
    }
    else {
        setTenzies(false);
    }
    },[dice]);

  
    function allNewDice() {
        const allNewDice = [];
       
        for(let i=0 ; i < 10; i++) {
            allNewDice.push(createNewDie());
        }
        return allNewDice;
    }

    function createNewDie() {

        return  {
            value:Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function holdDice(id) {
       setDice(prevDice => prevDice.map(die => {
        return die.id === id ? 
        {...die, isHeld: !die.isHeld } : die}))
    }

    function rollDice () {
        if(!tenzies) {
            setDice(prevDice=>prevDice.map(die=> {
                return die.isHeld ? die : createNewDie()
            }))
        }
        else {
            setDice(allNewDice())
        }
    }


    const dieElements = dice.map(die => <Die 
        key={die.id}
        value={die.value} 
         isHeld = {die.isHeld}
         holdDice = {holdDice}
         id={die.id}
        />)

    return(
        <div className="tenzies-body">
            {tenzies && <Confetti />}
            <div className="tenzies-main">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll untill all dice are the same. Click each Die
                    to freeze it at its current value between rolls.
                </p>
               <div className="dice-container">
                {dieElements}
               </div>
               <button onClick={rollDice} className="tenzies-main__btn">{tenzies ? "New Game" : "Roll"}</button>
            </div>

        </div>
    )
}
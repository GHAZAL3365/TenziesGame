
import React from "react";
import "./Die.css"

export default function Die(props) {
    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die" onClick={()=>props.holdDice(props.id)} style={styles}>
            <h2 className="die__value">{props.value}</h2>

        </div>
    )
}
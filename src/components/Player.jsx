import { useState } from "react"



export default function Player({initialName, symbol, isActive, onPlayerNameChange}) {
    const [playerName, setPlayerName] = useState(initialName)
    const [ isEditing, setIsEditing ] = useState(false);
    function handleOnClick() {
        setIsEditing((editing) =>  !editing);
        if(isEditing){
        onPlayerNameChange(symbol, playerName)
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);

    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {!isEditing && <span className="player-name">{playerName}</span>}
              {isEditing && <input type="text" required value={playerName} onChange={handleChange}/>}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleOnClick}>{isEditing ? "Save" : "Edit"} </button>
          </li>
    )
}
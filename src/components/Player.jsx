import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  function handleButton() {
    setIsEditing((prevState) => !prevState);
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
   if(isEditing){
    onChangeName(symbol, playerName)
   }
    
  }
  let editiblePalyer = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editiblePalyer = (
      <input onChange={handleChange} type="text" required value={playerName} />
    );
  }
  return (
    <li className={isActive && "active"}>
      <span className="player">
        {editiblePalyer}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleButton}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

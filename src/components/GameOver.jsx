
export default function GameOver({winner, onClick}) {
    return(
        <div id='game-over'>
            <h2>Game Over!</h2>
           {winner &&  <p>{winner} Won!</p>}
           {!winner && <p>Its a Draw!</p>}
            <p><button onClick={onClick}>Rematch!</button></p>
        </div>
    )
}
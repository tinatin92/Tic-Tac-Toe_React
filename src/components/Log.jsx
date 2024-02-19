

export default function Log ({turns}) {
    return (
        <ol id="log">
            {turns.map(turn => (
                <li key={`${turn.squere.row} ${turn.squere.col}`}>{turn.player} selected {turn.squere.row}, {turn.squere.col}</li>
            ))}
        </ol>
    )
}
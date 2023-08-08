function Die({ value, isHeld,holdDice,diceFaces }) {
    return (
        <div className={`die-face   ${isHeld && "isHeld"}`}  onClick={holdDice}>
            <h1 className="die-num" >{diceFaces[value]}</h1>
        </div>
    );
}

export default Die;

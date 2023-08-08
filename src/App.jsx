import Die from "./components/Die";
import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Confetti from "react-confetti";

function App() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [rollsNum, setRollsNum] = useState(0);
 

    const diceFaces = {
        1: "⚀",
        2: "⚁",
        3: "⚂",
        4: "⚃",
        5: "⚄",
        6: "⚅",
    };

    let diceElements = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
            diceFaces={diceFaces}
        />
    ));

    useEffect(() => {
        const isAllHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const isAllSameVal = dice.every((die) => die.value === firstValue);
        if (isAllHeld && isAllSameVal) {
            setTenzies(true);
        }
    }, [dice]);

    //**functions**

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.floor(Math.random() * 6 + 1),
            isHeld: false,
        };
    }
    function allNewDice() {
        let newArr = [];
        for (let i = 0; i < 10; i++) {
            let num = generateNewDie();
            newArr.push(num);
        }
        return newArr;
    }

    function rollDice() {
        if (!tenzies) {
            setRollsNum((prev) => prev + 1);
            setDice((oldDice) =>
                oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
            );
        } else setTenzies(false), setDice(() => allNewDice()), setRollsNum(0);
    }

    function holdDice(Id) {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.id === Id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    return (
        <>
            <main>
                {tenzies && <Confetti height={400} width={800} />}
                <h1 className="title">Tenzies</h1>
                <p className="instructions">
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
                <div className="dice-container">{diceElements}</div>
                {tenzies && <h2>You Won your Score is: {rollsNum}</h2>}

                <button className="roll-dice" onClick={rollDice}>
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </main>
        </>
    );
}

export default App;

import { useState } from "react";

function App(){

    const [currentRollScore, setCurrentRollScore] = useState(0);
    const [heldDice, setHeldDice] = useState([]);
    const [allPlayersTotalScore, setAllPlayersTotalScore] = useState([])
    const [remainingDiceCount, setRemainingDiceCount] = useState(6);
    const [possibleScoresDisplay, setPossibleScoresDisplay] = useState([]);

    const getRollValue = () => {
        return Math.floor(Math.random() * 6 + 1);
      }

    const rollTheDice = (num) => {
        setPossibleScoresDisplay([]);
        const roll = []
        for (let i=0; i<num; i++){
            roll.push(getRollValue())
        }
        console.log(roll);
        getScores(roll);
    }

    const getScores = (roll) => {
        let savedDice
        let possibleScores = [];
        let potentialScore = [];
        let allNumbers = [1, 2, 3, 4, 5, 6];
        const checkForStraight = allNumbers.every(i => roll.includes(i))
        if (checkForStraight){
            possibleScores.push([...roll, { score: 1500, dieCount: 6 }])
        }
        for (let i=1; i<7; i++){
            savedDice = roll.filter(die => die === i);
            if (savedDice.length === 2){
                potentialScore.push([...savedDice])
                if (potentialScore.length === 3){
                    possibleScores.push([...potentialScore[0], ...potentialScore[1], ...potentialScore[2], {score: 1500, dieCount: 6}])
                }
            } 
            if (savedDice.length >= 3){
                let score
                if (i === 1){
                score = 1000 * (savedDice.length - 2)
                possibleScores.push([...savedDice, { score, dieCount: savedDice.length }]);
                } else {
                    score = (i * 100) * (savedDice.length - 2)
                    possibleScores.push([...savedDice, { score, dieCount: savedDice.length }]);
                }
            }
            if (i === 1 && savedDice.length === 1 ){
                let score = 100
                possibleScores.push([...savedDice, { score, dieCount: 1 }])
            }
            if (i === 5 && savedDice.length === 1 ){
                let score = 50
                possibleScores.push([...savedDice, { score, dieCount: 1 }])
            }
            if (i === 1 && savedDice.length === 2 ){
                let score = 100
                possibleScores.push([1, { score }], [1, { score, dieCount: 2 }])
            }
            if (i === 5 && savedDice.length === 2 ){
                let score = 50
                possibleScores.push([5, { score }], [5, { score, dieCount: 2 }])
            } 
        }
        console.log(possibleScores);
        setPossibleScoresDisplay(possibleScores);
        console.log(possibleScoresDisplay)
        return possibleScores;
    }
    const addToTotal = (num) => {
        setCurrentRollScore(currentRollScore + num.score)
        setRemainingDiceCount(remainingDiceCount - num.dieCount)
        console.log(currentRollScore, remainingDiceCount);
    }



    return (
        <div className="hot-dice">
            <h1>Hot Ass Dice, baby!</h1>
            <button onClick={() => rollTheDice(remainingDiceCount)}>Roll!</button>
                <div>
                        {possibleScoresDisplay.map((scores) => (
                            <ul>
                                {scores.map((score) => (
                                    <li onClick={() => addToTotal(score)}>{score.score ? score.score : score}</li>
                                ))}
                            </ul>
                        ))}
                </div>
        </div>
    )
}

export default App;
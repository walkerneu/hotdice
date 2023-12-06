import { useState } from "react";

function App() {
  const [currentRollScore, setCurrentRollScore] = useState(0);
  const [heldDice, setHeldDice] = useState([]);
  const [allPlayersTotalScore, setAllPlayersTotalScore] = useState(0);
  const [remainingDiceCount, setRemainingDiceCount] = useState(6);
  const [possibleScoresDisplay, setPossibleScoresDisplay] = useState([]);
  const [currentRoll, setCurrentRoll] = useState([]);
  const [roundOver, setRoundOver] = useState(false);

  const getDieValue = () => {
    return Math.floor(Math.random() * 6 + 1);
  };

  const rollTheDice = () => {
    if (remainingDiceCount === 6) {
        setHeldDice([]);
    }
    if (remainingDiceCount === 0) {
      setRemainingDiceCount(6);
    }
    if (roundOver) {
      setRemainingDiceCount(6);
      setCurrentRollScore(0);
      setRoundOver(false);
    }
    setPossibleScoresDisplay([]);
    const roll = [];
    for (let i = 0; i < remainingDiceCount; i++) {
      roll.push(getDieValue());
    }
    console.log(roll);
    getScores(roll);
    setCurrentRoll(roll);
  };

  const getScores = (roll) => {
    let savedDice;
    let possibleScores = [];
    let boxcarCheck = [];
    let allNumbers = [1, 2, 3, 4, 5, 6];
    const checkForStraight = allNumbers.every((i) => roll.includes(i));
    if (checkForStraight) {
      possibleScores.push([...roll, { score: 1500, dieCount: 6 }]);
    }
    for (let i = 1; i < 7; i++) {
      savedDice = roll.filter((die) => die === i);
      if (savedDice.length === 2) {
        boxcarCheck.push([...savedDice]);
        if (boxcarCheck.length === 3) {
          possibleScores.push([
            ...boxcarCheck[0],
            ...boxcarCheck[1],
            ...boxcarCheck[2],
            { score: 1500, dieCount: 6 },
          ]);
        }
      }
      if (savedDice.length >= 3) {
        let score;
        if (i === 1) {
          score = 1000 * (savedDice.length - 2);
          possibleScores.push([
            ...savedDice,
            { score, dieCount: savedDice.length },
          ]);
        } else {
          score = i * 100 * (savedDice.length - 2);
          possibleScores.push([
            ...savedDice,
            { score, dieCount: savedDice.length },
          ]);
        }
      }
      if (i === 1 && savedDice.length === 1) {
        let score = 100;
        possibleScores.push([...savedDice, { score, dieCount: 1 }]);
      }
      if (i === 5 && savedDice.length === 1) {
        let score = 50;
        possibleScores.push([...savedDice, { score, dieCount: 1 }]);
      }
      if (i === 1 && savedDice.length === 2) {
        let score = 100;
        possibleScores.push(
          [1, { score, dieCount: 1 }],
          [1, { score, dieCount: 1 }]
        );
      }
      if (i === 5 && savedDice.length === 2) {
        let score = 50;
        possibleScores.push(
          [5, { score, dieCount: 1 }],
          [5, { score, dieCount: 1 }]
        );
      }
      if (i === 6 && possibleScores.length === 0) {
        setRemainingDiceCount(6);
        setHeldDice([]);
        setRoundOver(true);
      }
    }
    setPossibleScoresDisplay(possibleScores);
  };
  const addToTotal = (nums, score, event) => {
    setCurrentRollScore(currentRollScore + score.score);
    setHeldDice([...heldDice, nums]);
    if(remainingDiceCount - score.dieCount === 0){
      setRemainingDiceCount(6);
    }
    else {
      setRemainingDiceCount(remainingDiceCount - score.dieCount);
    }
  };

  const holdScore = () => {
    setAllPlayersTotalScore(
      Number(currentRollScore) + Number(allPlayersTotalScore)
    );
    setCurrentRollScore(0);
    setRemainingDiceCount(6);
    setHeldDice([]);
    setRoundOver(true);
    setPossibleScoresDisplay([]);
  };

  return (
    <div className="hot-dice">
      <h1>Hot Ass Dice, baby!</h1>
      <div>
        <h3>Total Score: {allPlayersTotalScore}</h3>
        <h3>Current Round Score: {currentRollScore}</h3>
        <h3>Remaining Dice: {remainingDiceCount}</h3>
        <h3>Held Dice:</h3>
        {heldDice.map((dice) => (
          <span>{dice}</span>
        ))}
        <h3>Current Roll:</h3>
        <h4>
          {currentRoll.map((roll) => (
            <span>{roll} </span>
          ))}
        </h4>
      </div>
      <button onClick={rollTheDice}>Roll!</button>
      {(allPlayersTotalScore <= 1000 && currentRollScore >= 1000) ||
      allPlayersTotalScore >= 1000 ? (
        <button onClick={holdScore}>Hold Score!</button>
      ) : (
        ""
      )}
      <div>
        {possibleScoresDisplay.map((scores) => (
          <ul
            onClick={() =>
              addToTotal(scores.slice(0, -1), scores[scores.length - 1], event)}>
            {scores.map((score) => (
              <li>{score.score ? score.score : score}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;

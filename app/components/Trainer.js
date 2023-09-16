import "./Trainer.css";
import Card from "./Card";
import Table from "./Table";
import { gridStringSorted, suits } from "../constants";
import { useEffect, useState } from "react";

export default function Trainer({ strategy, position, solution }) {
  const [holecards, setHolecards] = useState(["As", "Ah"]);
  const [rng, setRng] = useState(0);
  const [cardsString, setCardsString] = useState("AA");
  const [choices, setChoices] = useState([]);
  const [answerObj, setAnswerObj] = useState(getAnswerObj);
  const [showAnswer, setShowAnswer] = useState(false);
  const [range, setRange] = useState(getRange);
  const [result, setResult] = useState("");

  useEffect(() => {
    setRange((r) => getRange());
    dealCards();
  }, [position]);

  function getChoices() {
    let result = [];

    for (let action in strategy) {
      result.push(action);
    }

    return result;
  }

  function getRange() {
    let range = [];

    if (strategy.Range == "All") {
      range = gridStringSorted;
    } else {
      range = gridStringSorted.filter((string, i) => {
        return solution[strategy.Range[0]][strategy.Range[1]][i] > 0;
      });
    }

    return range;
  }

  function dealCards() {
    let tempSuits = suits;

    let cards = range[Math.floor(Math.random() * range.length)];
    console.log("cards", cards);

    let card1 =
      cards[0] + tempSuits[Math.floor(Math.random() * tempSuits.length)];

    // remove the used suit from the suits
    tempSuits = tempSuits.filter((s) => s !== card1[1]);
    let card2 = "";

    if (cards[2] === "o" || cards[0] === cards[1]) {
      // offsuit or pair
      card2 =
        cards[1] + tempSuits[Math.floor(Math.random() * tempSuits.length)];
    } else if (cards[2] === "s") {
      // suited
      card2 = cards[1] + card1[1];
    } else {
      // error, non-valid hand notation
      console.error("non-valid notation?");
    }

    console.log(card1, card2);
    setRng(parseInt(Math.random() * 100));
    setCardsString(cards);
    setHolecards([card1, card2]);
    setChoices(getChoices());
    setAnswerObj(getAnswerObj());
    setShowAnswer(false);
  }

  function getAnswerObj() {
    let index = gridStringSorted.indexOf(cardsString);
    let answerObj = {};

    for (let action in strategy) {
      answerObj[action] = strategy[action][index] * 100;
    }

    return answerObj;
  }

  function getCorrectRngAnswer() {
    let answerObj = getAnswerObj();
    let reversedKeys = Object.keys(answerObj).reverse();
    let sum = 0;
    let answer = "none found";
    let answerFound = false;

    reversedKeys.forEach((key) => {
      sum += answerObj[key];
      if (!answerFound && rng <= sum) {
        answer = key;
        answerFound = true;
      }
    });

    return answer;
  }

  function handleChoice(choice) {
    let answer = getCorrectRngAnswer();
    if (choice == answer) {
      setResult("Correct");
    } else {
      setResult("Wrong");
    }
    setShowAnswer(true);
  }

  return (
    <div className="trainer">
      <div className="trainer-rng">Low rng: {rng}</div>
      <Table position={position} heroCards={holecards} />
      {showAnswer && (
        <div
          className={`trainer-answer ${
            result === "Correct"
              ? "trainer-answer-correct"
              : "trainer-answer-wrong"
          }`}
        >
          {result}
        </div>
      )}
      <div className="trainer-choices">
        {choices.map((choice) => {
          if (choice == "Range") return;
          return (
            <button
              key={choice}
              onClick={() => handleChoice(choice)}
              type="button"
              className={`button button-${choice.toLowerCase()}`} // #todo constant logic
            >
              {choice}
            </button>
          );
        })}
      </div>
      <div className="button button-new" onClick={dealCards}>
        New hand
      </div>
    </div>
  );
}

import "./Trainer.css";
import Table from "./Table";
import Answer from "./Answer";
import Choices from "./Choices";
import { gridStringSorted, suits, actionsMap } from "../constants";
import { useEffect, useState } from "react";

export default function Trainer({ positions, solution }) {
  const [isAutoHand, setIsAutoHand] = useState(false);
  const [trainerState, setTrainerState] = useState({});

  useEffect(() => {
    dealHeroCards();
  }, [positions]);

  function getHeroRange() {
    let range = [];
    let strategy = solution[positions];

    if (strategy.Range == "All") {
      range = gridStringSorted;
    } else {
      range = gridStringSorted.filter((string, i) => {
        return solution[strategy.Range[0]][strategy.Range[1]][i] > 0;
      });
    }

    return range;
  }

  function getChoices() {
    let result = [];
    let strategy = solution[positions];

    for (let action in strategy) {
      result.push(action);
    }

    return result;
  }

  function dealHeroCards() {
    let tempSuits = [...suits];
    let range = getHeroRange();

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

    let answerObj = getAnswerObj(cards);
    let rng = parseInt(Math.random() * 100) + 1;

    setTrainerState((prev) => {
      return {
        rng: rng,
        cardsString: cards,
        holecards: [card1, card2],
        showAnswer: isAutoHand ? true : false,
        userChoice: null,
        answerObj: answerObj,
        answer: getCorrectRngAnswer(answerObj, rng),
        lastAnswer: {
          userChoice: prev.userChoice,
          answerObj: prev.answerObj,
          answer: prev.answer,
        },
      };
    });
  }

  function getAnswerObj(cards) {
    let index = gridStringSorted.indexOf(cards);
    let answerObj = {};
    let strategy = solution[positions];

    for (let action in strategy) {
      answerObj[action] = strategy[action][index] * 100;
    }

    return answerObj;
  }

  function getCorrectRngAnswer(answerObj, rng) {
    let reversedKeys = Object.keys(answerObj).reverse();
    let sum = 0;
    let answer = "none found";
    let answerFound = false;

    console.log("answerObj:", answerObj);

    reversedKeys.forEach((key) => {
      sum += answerObj[key];
      console.log("answerObj key", key, sum, rng);

      if (!answerFound && rng <= sum) {
        answer = key;
        answerFound = true;
      }
    });

    console.log("correct answer is", answer);

    return answer;
  }

  function handleChoice(choice) {
    console.log("choice made:", choice);
    setTrainerState({ ...trainerState, userChoice: choice, showAnswer: true });

    if (isAutoHand) {
      dealHeroCards();
    }
  }

  function onIsAutoHandToggle() {
    setTrainerState({ ...trainerState, showAnswer: false, lastAnswer: {} });
    setIsAutoHand(!isAutoHand);
    dealHeroCards();
  }

  return (
    <div className="relative flex flex-col justify-center">
      <div className="trainer-rng">Low rng: {trainerState.rng}</div>
      <div className="text-white text-xs">
        Debug:
        <br />
        Correct answer: {trainerState.answer}
        <br />
        User choice: {trainerState.userChoice}
        <br />
        Rng: {trainerState.rng}
        <br />
      </div>
      <Table positions={positions} heroCards={trainerState.holecards} />
      {isAutoHand ? (
        <Answer
          show={trainerState.showAnswer}
          isCorrect={
            trainerState.lastAnswer.answer == trainerState.lastAnswer.userChoice
          }
          userChoice={trainerState.lastAnswer.userChoice}
          userChoiceValue={
            trainerState.lastAnswer.answerObj &&
            trainerState.lastAnswer.answerObj[
              trainerState.lastAnswer.userChoice
            ]
          }
        />
      ) : (
        <Answer
          show={trainerState.showAnswer}
          isCorrect={trainerState.answer == trainerState.userChoice}
          userChoice={trainerState.userChoice}
          userChoiceValue={
            trainerState.answerObj &&
            trainerState.answerObj[trainerState.userChoice]
          }
        />
      )}
      <Choices choices={getChoices()} onChoiceChange={handleChoice} />
      <div className="button button-new" onClick={dealHeroCards}>
        New hand
      </div>
      <div className="flex justify-end items-center">
        <label className="text-white">
          <input
            type="checkbox"
            checked={isAutoHand}
            onChange={() => onIsAutoHandToggle()}
          />{" "}
          Auto deal new hand
        </label>
      </div>
    </div>
  );
}

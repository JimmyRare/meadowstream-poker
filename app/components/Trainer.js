import { useQuery } from "@tanstack/react-query";
import "./Trainer.css";
import Table from "./Table";
import Answer from "./Answer";
import Choices from "./Choices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  daDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";
import { gridStringSorted, suits, actionsMap } from "../constants";
import { useEffect, useState } from "react";
import { getStartingRange } from "../services/apiScenarios";

export default function Trainer({ positions, scenarios, onAddHistory }) {
  const [isAutoHand, setIsAutoHand] = useState(false);
  const [holecards, setHolecards] = useState(null);
  const [cardsString, setCardsString] = useState(null);
  const [userChoice, setUserChoice] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [handCount, setHandCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [rng, setRng] = useState(null);
  const [answerObj, setAnswerObj] = useState(null);

  console.log("render", holecards);

  useEffect(() => {
    setHolecards(null), setIsAutoHand(false);
  }, [positions]);

  useEffect(() => {
    if (holecards) {
      setRng(getRng());
      setAnswerObj(getAnswerObj(cardsString));
    }
  }, [holecards]);

  useEffect(() => {
    if (answerObj) {
      setCorrectAnswer(getCorrectRngAnswer(answerObj, rng));
    }
  }, [answerObj]);

  // filter the options hero has regarding to positions
  let filteredScenarios = scenarios.filter((scenario) => {
    if (positions.length > 2) {
      return (
        scenario.position == positions.toLowerCase().substring(0, 2) &&
        scenario.vs_position === positions.toLowerCase().slice(-2)
      );
    } else {
      return (
        scenario.position == positions.toLowerCase() &&
        scenario.vs_position === null
      );
    }
  });

  const { data: range, isLoading } = useQuery({
    queryKey: ["startingRange"],
    queryFn: async () => {
      let range = [];
      let id = filteredScenarios[0].starting_range_id;
      if (id === null) {
        range = gridStringSorted;
      } else {
        let startingRange = await getStartingRange(id);
        range = gridStringSorted.filter((string, i) => {
          return startingRange[i] > 0;
        });
      }

      return range;
    },
  });

  if (isLoading) return <div>Loading</div>;

  console.log("filteredScenarios", filteredScenarios);

  function getHolecardsFromCardNotation(cards) {
    let tempSuits = [...suits];

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

    return [card1, card2];
  }

  function dealHeroCards() {
    // save previous answer if it exists
    if (userChoice) {
      onAddHistory({
        userChoice,
        correctAnswer,
        answerObj,
        setHolecards,
        cardsString,
      });
    }

    // select cards from range
    let cards = range[Math.floor(Math.random() * range.length)];
    let holecards = getHolecardsFromCardNotation(cards);

    setCardsString(cards);
    setHolecards(holecards);
    setUserChoice(null);
  }

  function getRng() {
    return parseInt(Math.floor(Math.random() * 100) + 1);
  }

  function getAnswerObj(cards) {
    let index = gridStringSorted.indexOf(cards);
    let answerObj = {};

    filteredScenarios.map((scenario) => {
      answerObj[scenario.action] = scenario.strategy[index] * 100;
    });

    console.log(answerObj);

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
        answer = [key, answerObj[key]];
        answerFound = true;
      }
    });

    console.log("correct answer is", answer);

    return answer;
  }

  function handleChoice(choice) {
    console.log("choice made:", choice, correctAnswer);
    setHandCount((n) => n + 1);

    if (correctAnswer[0] === choice[0]) {
      setCorrectCount((n) => n + 1);
    }

    setUserChoice(choice);

    if (isAutoHand) {
      dealHeroCards();
    }
  }

  function onIsAutoHandToggle() {
    setIsAutoHand((a) => !a);
    // dealHeroCards();
  }

  return (
    <div className="relative flex flex-col justify-center m-5">
      <div className="font-black text-white text-4xl flex justify-between">
        <div>
          <h1 className="text-4xl font-bold">{positions}</h1>
          <div className="text-white text-xs">
            <span className="text-lg font-bold">Debug</span>
            <br />
            Correct answer:
            {correctAnswer &&
              `${correctAnswer[0]}, ${Math.round(correctAnswer[1])}%`}
            <br />
            User choice: {userChoice && `${userChoice[0]}, ${userChoice[1]}`}
            <br />
            Rng: {rng}
            <br />
          </div>
        </div>

        <div>
          <FontAwesomeIcon className="mr-2 text-right" icon={faDiceSix} />
          {rng}
          <div className="text-4xl font-bold mt-5 text-right">
            {correctCount} / {handCount}
          </div>
          {handCount > 0 && (
            <div className="text-xs text-right mt-1">
              {Math.round((correctCount / handCount) * 100)}%
            </div>
          )}
        </div>
      </div>

      <Table positions={positions} heroCards={holecards} />

      {userChoice && (
        <Answer
          correctAnswer={correctAnswer}
          userChoice={userChoice}
          answerObj={answerObj}
        />
      )}

      {!userChoice && holecards && (
        <Choices
          filteredScenarios={filteredScenarios}
          onChoiceChange={handleChoice}
        />
      )}

      <button
        type="button"
        className="disabled:bg-gray disabled:translate-y-0 disabled:opacity-10 text-white text-2xl mt-2 self-end active:translate-y-1 bg-green text-center rounded p-4 font-black drop-shadow cursor-pointer"
        onClick={dealHeroCards}
        disabled={isAutoHand}
      >
        New hand
      </button>
      <div className="flex justify-end items-center mt-2">
        <input
          name="new-hand"
          className="bg-gray checked:bg-green w-4 h-4 mr-2"
          type="checkbox"
          checked={isAutoHand}
          onChange={() => onIsAutoHandToggle()}
        />
        <label htmlFor="new-hand" className="text-white text-sm">
          Auto deal new hand
        </label>
      </div>
    </div>
  );
}

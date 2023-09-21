import { useQuery } from "@tanstack/react-query";
import "./Trainer.css";
import Table from "./Table";
import Player from "./Player";
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
import {
  gridStringSorted,
  suits,
  actionsMap,
  tablePositions,
} from "../constants";
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
  const [lastAnswer, setLastAnswer] = useState(null);

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

  const {
    data: startingRange,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["startingRange", filteredScenarios[0].starting_range_id],
    queryFn: () => getStartingRange(filteredScenarios[0].starting_range_id),
  });

  function getHeroRange() {
    let range = [];
    if (startingRange === null) {
      range = gridStringSorted;
    } else {
      range = gridStringSorted.filter((string, i) => {
        return startingRange[0].strategy[i] > 0;
      });
    }

    return range;
  }

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

  function dealHeroCards(choice) {
    // save previous answer if it exists
    console.log("userChoice before deal new hand", choice);
    if (choice) {
      setLastAnswer({
        userChoice: choice,
        answerObj,
        correctAnswer,
      });

      onAddHistory({
        choice,
        correctAnswer,
        answerObj,
        setHolecards,
        cardsString,
      });
    } else {
      setLastAnswer(null);
    }

    let range = getHeroRange();

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

  // Setup an object with frequencies for each action with current hand
  function getAnswerObj(cards) {
    let index = gridStringSorted.indexOf(cards);
    let answerObj = {};

    filteredScenarios.map((scenario) => {
      if (scenario.size == 100) {
        // is allin raise
        answerObj["allin"] = scenario.strategy[index] * 100;
      } else {
        answerObj[scenario.action] = scenario.strategy[index] * 100;
      }
    });

    console.log(answerObj);

    return answerObj;
  }

  function getCorrectRngAnswer(answerObj, rng) {
    let keys = ["allin", "raise", "call", "fold"];
    let sum = 0;
    let answer = "none found";
    let answerFound = false;

    keys.map((key) => {
      if (answerObj[key]) {
        sum += answerObj[key];
        console.log("answerObj key", key, sum, rng);

        if (!answerFound && rng <= sum) {
          answer = [key, answerObj[key]];
          answerFound = true;
        }
      }
    });

    return answer;
  }

  function handleChoice(choice) {
    setHandCount((n) => n + 1);

    if (correctAnswer[0] === choice.toLowerCase()) {
      setCorrectCount((n) => n + 1);
    }

    setUserChoice(choice);

    if (isAutoHand) {
      dealHeroCards(choice);
    }
  }

  function onIsAutoHandToggle() {
    setIsAutoHand((a) => !a);
    dealHeroCards(null);
  }

  function isHero(p) {
    return p == positions.substring(0, 2).toLowerCase();
  }

  function isVillain(p) {
    return p == positions.slice(-2).toLowerCase() && positions.length > 2;
  }

  function getInvested(p) {
    let s = filteredScenarios[0];
    let invested = 0;

    if (p == "sb") {
      invested = 0.5;
    }

    if (p == "bb") {
      invested = 1;
    }

    if (p == s.position) {
      // get hero investement
      invested = s.invested;
    } else if (p == s.vs_position) {
      // get villains investment
      invested = s.vs_size;
    }

    return invested;
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
            User choice: {userChoice && `${userChoice}`}
            <br />
            Rng: {rng}
            <br />
          </div>
        </div>

        <div className="text-right">
          <FontAwesomeIcon className="mr-2" icon={faDiceSix} />
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

      <Table>
        {tablePositions.map((p) => {
          return (
            <Player
              position={p}
              key={p}
              isHero={isHero(p)}
              isVillain={isVillain(p)}
              holecards={isHero(p) ? holecards : null}
              invested={getInvested(p)}
            />
          );
        })}
      </Table>

      <Answer
        correctAnswer={isAutoHand ? lastAnswer?.correctAnswer : correctAnswer}
        userChoice={isAutoHand ? lastAnswer?.userChoice : userChoice}
        answerObj={isAutoHand ? lastAnswer?.answerObj : answerObj}
      />

      {holecards && (
        <Choices
          filteredScenarios={filteredScenarios}
          onChoiceChange={handleChoice}
          disabled={userChoice !== null}
        />
      )}

      <button
        type="button"
        className="disabled:bg-gray disabled:translate-y-0 disabled:opacity-10 text-white text-2xl mt-2 self-end active:translate-y-1 bg-green text-center rounded p-4 font-black drop-shadow cursor-pointer"
        onClick={() => dealHeroCards(null)}
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

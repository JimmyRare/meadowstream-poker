import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { actionsMap } from "../constants";
import { useState } from "react";

export default function Answer({ correctAnswer, userChoice, answerObj }) {
  console.log("a", correctAnswer, userChoice, answerObj);

  if (!userChoice) return;

  let isCorrect = false;
  let choiceAction = userChoice.split(" ")[0].toLowerCase();

  if (correctAnswer && userChoice) {
    isCorrect = correctAnswer[0] == choiceAction;
  }

  let cssString = isCorrect
    ? "border-green text-green "
    : "border-red text-red ";

  return (
    <div
      className={`border-4 ease-in rounded absolute left-2/4 p-5 top-0 -translate-x-1/4 text-center text-uppercase text-4xl font-black ${cssString}`}
    >
      <FontAwesomeIcon className="mr-5" icon={isCorrect ? faCheck : faXmark} />
      {userChoice}&nbsp;
      {Math.round(answerObj[choiceAction])}%
      {!isCorrect && (
        <div className=" text-green text-xl">
          <FontAwesomeIcon className="mr-5" icon={faCheck} />
          {correctAnswer[0]}&nbsp;
          {Math.round(answerObj[correctAnswer[0]])}%
        </div>
      )}
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { actionsMap } from "../constants";
import { useState } from "react";

export default function Answer({ correctAnswer, userChoice, answerObj }) {
  console.log("a", correctAnswer, userChoice, answerObj);

  let isCorrect = false;

  if (correctAnswer && userChoice) {
    isCorrect = correctAnswer[0] == userChoice[0];
  }

  let cssString = isCorrect
    ? "border-green text-green "
    : "border-red text-red ";

  return (
    userChoice && (
      <div
        className={`border-4 ease-in rounded absolute left-2/4 p-5 top-0 -translate-x-1/4 text-center text-uppercase text-4xl font-black ${cssString}`}
      >
        <FontAwesomeIcon
          className="mr-5"
          icon={isCorrect ? faCheck : faXmark}
        />
        {userChoice[0].charAt(0).toUpperCase() + userChoice[0].slice(1)}{" "}
        {Math.round(answerObj[userChoice[0]]) + "%"}
      </div>
    )
  );
}

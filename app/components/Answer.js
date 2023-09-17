import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { actionsMap } from "../constants";

export default function Answer({
  show,
  isCorrect,
  userChoice,
  userChoiceValue,
}) {
  console.log(show, isCorrect, userChoice, userChoiceValue);
  let cssString = isCorrect
    ? "border-green text-green "
    : "border-red text-red ";

  return (
    <div
      className={`${
        show ? "opacity-100" : "opacity-0"
      } border-4 ease-in rounded absolute left-2/4 p-5 top-0 -translate-x-2/4 text-center text-uppercase text-xl ${cssString}`}
    >
      <FontAwesomeIcon className="mr-5" icon={isCorrect ? faCheck : faXmark} />
      {userChoice &&
        `${actionsMap[userChoice[0].toLowerCase()]} ${userChoiceValue}%`}
    </div>
  );
}

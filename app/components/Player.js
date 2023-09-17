import "./Player.css";
import Card from "./Card";

export default function Player({ position, isHero, isVillain, holecards }) {
  let cssClass = getCssActivePlayersString();
  let cssPosition = getCssPositionString();

  function getCssActivePlayersString() {
    if (isHero) {
      return "border-green";
    } else if (isVillain) {
      return "border-yellow";
    } else {
      return "border-gray";
    }
  }

  function getCssPositionString() {
    switch (position) {
      case "ep":
        return "-top-10 left-2/4 -translate-x-1/4";
      case "mp":
        return "top-10 -right-20";
      case "co":
        return "bottom-10 -right-20";
      case "bu":
        return "-bottom-10 left-2/4 -translate-x-1/4";
      case "sb":
        return "bottom-10 left-6";
      case "bb":
        return "top-10 left-6";
      default:
        return;
    }
  }

  return (
    <div className={`flex absolute ${cssPosition}`}>
      <div
        className={`player-position w-24 h-24 flex items-center border-4 rounded-full ${cssClass}`}
      >
        {position}
      </div>
      <div className="flex items-center gap-0.5">
        <Card notation={holecards ? holecards[0] : null} />
        <Card notation={holecards ? holecards[1] : null} />
      </div>
    </div>
  );
}

import "./Player.css";
import Card from "./Card";

export default function Player({
  position,
  isHero,
  isVillain,
  holecards,
  invested,
}) {
  let cssClass = getCssActivePlayersString();
  let cssPlayerPosition = getPlayerPositionString();
  let cssInvested = getInvestedString();

  function getCssActivePlayersString() {
    if (isHero) {
      return "border-green brightness-125 text-white";
    } else if (isVillain) {
      return "border-yellow brightness-125 text-white";
    } else {
      return "border-gray text-gray";
    }
  }

  function getPlayerPositionString() {
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

  function getInvestedString() {
    switch (position) {
      case "ep":
        return "-bottom-10 left-6 -translate-x-1/4";
      case "mp":
        return "-bottom-10 left-2";
      case "co":
        return "-top-10 left-2";
      case "bu":
        return "-top-10 left-6 -translate-x-1/4";
      case "sb":
        return "-top-10 left-2";
      case "bb":
        return "-bottom-10 left-2";
      default:
        return;
    }
  }

  return (
    <div className={`flex absolute ${cssPlayerPosition}`}>
      {invested > 0 && (
        <div
          className={`text-white text-center text-2xl absolute w-20 ${cssInvested}`}
        >
          {invested}
        </div>
      )}
      <div
        className={`player-position w-24 h-24 flex items-center border-4 rounded-full bg-dark ${cssClass}`}
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

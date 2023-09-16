import "./Player.css";
import Card from "./Card";

export default function Player({ position, isHero, isVillain, holecards }) {
  let cssClass = "";
  if (isHero) {
    cssClass = "player-is-hero";
  }
  if (isVillain) {
    cssClass = "player-is-villain";
  }

  return (
    <div className={`player player-${position} ${cssClass}`}>
      <div className={"player-position"}>{position}</div>
      <div className="player-cards">
        <Card notation={holecards ? holecards[0] : null} />
        <Card notation={holecards ? holecards[1] : null} />
      </div>
    </div>
  );
}

import "./Card.css";

export default function Card({ notation }) {
  // Short notation, set random suits
  let rank;
  let suit;

  if (!notation) {
  } else {
    rank = notation[0];
    suit = notation[1];
  }

  function getSymbol(suit) {
    switch (suit) {
      case "s":
        return "♠";
      case "h":
        return "♥";
      case "d":
        return "♦";
      case "c":
        return "♣";
      default:
        return "";
    }
  }

  return (
    <div className={`card card-${suit}`}>
      <div className="card-rank">{rank}</div>
      <div className="card-suit">{getSymbol(suit)}</div>
    </div>
  );
}

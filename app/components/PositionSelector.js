import "./PositionSelector.css";
import { positionGrid } from "../constants";

export default function PositionSelector({ positionHandler, position }) {
  return (
    <div className="position-grid">
      {positionGrid.map((pos) => {
        let cssString = "";
        if (pos.length == 2) {
          cssString += "position-highlight ";
        }

        if (position == pos) {
          cssString += "position-selected";
        }
        return (
          <div
            key={pos}
            className={cssString}
            id={pos}
            onClick={() => positionHandler(pos)}
          >
            {pos.substr(-2)}
          </div>
        );
      })}
    </div>
  );
}

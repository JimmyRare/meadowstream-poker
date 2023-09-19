import "./PositionSelector.css";
import { positionsGrid } from "../constants";

export default function PositionSelector({ positionsHandler, positions }) {
  return (
    <div className="position-grid m-5">
      {positionsGrid.map((pos) => {
        let cssString = "";
        if (pos.length == 2) {
          cssString += "position-highlight ";
        }

        if (positions == pos) {
          cssString += "position-selected";
        }
        return (
          <div
            key={pos}
            className={cssString}
            id={pos}
            onClick={() => positionsHandler(pos)}
          >
            {pos.substr(-2)}
          </div>
        );
      })}
    </div>
  );
}

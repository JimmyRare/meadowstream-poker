import "./Table.css";
import Player from "./Player";
import { tablePositions } from "../constants";

export default function Table({ positions, heroCards }) {
  console.log(positions);
  return (
    <div className="flex justify-center">
      <div className="table">
        {tablePositions.map((p) => {
          let isHero = false;
          let isVillain = false;

          if (p === positions.slice(0, 2).toLowerCase()) {
            isHero = true;
          }

          if (p === positions.slice(-2).toLowerCase()) {
            isVillain = true;
          }

          return (
            <Player
              position={p}
              key={p}
              isHero={isHero}
              isVillain={isVillain}
              holecards={isHero ? heroCards : null}
            />
          );
        })}
      </div>
    </div>
  );
}

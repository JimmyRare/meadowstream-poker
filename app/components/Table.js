import "./Table.css";
import Player from "./Player";
import { positions } from "../constants";

export default function Table({ position, heroCards }) {
  return (
    <div className="flex justify-center">
      <div className="table">
        {positions.map((p) => {
          let isHero = false;
          let isVillain = false;

          if (p === position.slice(0, 2).toLowerCase()) {
            isHero = true;
          }

          if (p === position.slice(-2).toLowerCase()) {
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

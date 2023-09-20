import "./Table.css";
import Player from "./Player";
import { tablePositions } from "../constants";

export default function Table({ children }) {
  return (
    <div className="flex justify-center">
      <div className="table">{children}</div>
    </div>
  );
}

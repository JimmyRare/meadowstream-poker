import { useQuery } from "@tanstack/react-query";
import PositionSelector from "./PositionSelector";
import RangeViewer from "./RangeViewer";
import Trainer from "./Trainer";
import { getScenarios } from "../services/apiScenarios";
import { useState, useEffect } from "react";
import { NL500_GTO_SMALLER } from "../ranges";

export default function Main() {
  const [solution, setSolution] = useState(NL500_GTO_SMALLER);
  const [positions, setPositions] = useState("BBvsBU");
  const [history, setHistory] = useState([]);

  function onPositionsChange(pos) {
    setPositions(pos);
    console.log(`positions set to ${pos}`);
  }

  const {
    isLoading,
    data: scenarios,
    error,
  } = useQuery({
    queryKey: ["scenarios"],
    queryFn: getScenarios,
  });

  console.log(scenarios);

  if (isLoading) return <div>Loading data...</div>;

  function handleAddHistory(data) {
    console.log("history coming", data);
    setHistory((h) => {
      console.log(h);
      return [data, ...h];
    });
  }

  return (
    <main>
      <Trainer
        positions={positions}
        scenarios={scenarios}
        onAddHistory={(data) => handleAddHistory(data)}
      />
      <div>
        <PositionSelector
          positionsHandler={onPositionsChange}
          positions={positions}
        />
        {/* {history && (
          <ul>
            {history.map((h, i) => {
              return (
                <li className="text-white" key={i}>
                  {h.cardsString}
                </li>
              );
            })}
          </ul>
        )} */}
      </div>
      <RangeViewer strategy={solution[positions]} />
    </main>
  );
}

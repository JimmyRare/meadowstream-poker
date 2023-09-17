"use client";

import { useState } from "react";
import PositionSelector from "./components/PositionSelector";
import RangeViewer from "./components/RangeViewer";
import { NL500_GTO_SMALLER } from "./ranges";
import Trainer from "./components/Trainer";

export default function Home() {
  const [solution, setSolution] = useState(NL500_GTO_SMALLER);
  const [positions, setPositions] = useState("BBvsBU");

  function onPositionsChange(pos) {
    setPositions(pos);
    console.log(`positions set to ${pos}`);
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Position: {positions}</h1>
      <main>
        <Trainer positions={positions} solution={solution} />
        <PositionSelector
          positionsHandler={onPositionsChange}
          positions={positions}
        />
        <RangeViewer strategy={solution[positions]} />
      </main>
    </>
  );
}

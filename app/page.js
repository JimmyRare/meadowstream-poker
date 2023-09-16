"use client";

import { useState } from "react";
import PositionSelector from "./components/PositionSelector";
import RangeViewer from "./components/RangeViewer";
import { NL500_GTO_SMALLER } from "./ranges";
import Trainer from "./components/Trainer";

export default function Home() {
  const [solution, setSolution] = useState(NL500_GTO_SMALLER);
  const [position, setPosition] = useState("BBvsBU");

  function onPositionChange(pos) {
    setPosition(pos);
    console.log(`position set to ${pos}`);
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Position: {position}</h1>
      <main>
        <Trainer
          strategy={solution[position]}
          position={position}
          solution={solution}
        />
        <PositionSelector
          positionHandler={onPositionChange}
          position={position}
        />
        <RangeViewer strategy={solution[position]} />
      </main>
    </>
  );
}

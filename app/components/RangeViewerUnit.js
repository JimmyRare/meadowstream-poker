import "./RangeViewerUnit.css";
import { useState, useEffect } from "react";

export default function RangeViewerUnit({ id, hand, actions, actionCodes }) {
  const [backgroundSizeString, setBackgroundSizeString] = useState(
    buildBackgroundSizeString
  );
  const [linearGradientString, setLinearGradientString] = useState(
    buildLinearGradientString
  );

  useEffect(() => {
    setBackgroundSizeString(buildBackgroundSizeString);
    setLinearGradientString(buildLinearGradientString);
  }, [actions]);

  function buildLinearGradientString() {
    let stringArray = [];

    let actionsArray = actionCodes.map((code) => {
      if (code == "RAI") return "allin";
      if (code[0] == "R") return "raise";
      if (code[0] == "C") return "call";
      if (code[0] == "F") return "fold";
    });

    for (let i = 0; i < actions.length; i++) {
      stringArray.push(
        `linear-gradient(to right, var(--grid-${actionsArray[i]}-color), var(--grid-${actionsArray[i]}-color)),`
      );
    }

    return stringArray.join("").slice(0, -1);
  }

  function buildBackgroundSizeString() {
    let string = "";
    let tot = 0;
    for (let i = 0; i < actions.length; i++) {
      if (i == 0) {
        string += `${actions[0] * 100}% 100%,`;
      } else {
        string += `${tot + actions[i] * 100}% 100%,`;
      }
      tot += actions[i] * 100;
    }
    return string.substr(0, string.length - 1);
  }

  return (
    <div
      id={id}
      style={{
        backgroundImage: linearGradientString,
        backgroundSize: backgroundSizeString,
      }}
    >
      {hand}
    </div>
  );
}

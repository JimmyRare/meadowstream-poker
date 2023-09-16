import { useState, useEffect } from "react";
import "./RangeViewer.css";
import { gridString, gridStringSorted } from "../constants";
import RangeViewerUnit from "./RangeViewerUnit";

export default function RangeViewer({ strategy }) {
  const [actionsObj, setActionsObj] = useState(setup);

  useEffect(() => {
    setActionsObj(setup);
  }, [strategy]);

  function setup() {
    let setupObj = {};

    for (const action in strategy) {
      setupObj[action] = [];
    }

    for (const action in strategy) {
      for (let i = 0; i < gridStringSorted.length; i++) {
        setupObj[action][gridStringSorted[i]] = strategy[action][i];
      }
    }

    return setupObj;
  }

  function gridView() {
    return gridString.map((hand, index) => {
      let handActions = [];
      let actionCodes = [];
      for (let action in actionsObj) {
        if (action == "Range") continue;
        handActions.unshift(actionsObj[action][hand]);
        actionCodes.unshift(action);
      }

      return (
        <RangeViewerUnit
          key={index}
          id={hand}
          hand={hand}
          actions={handActions}
          actionCodes={actionCodes}
        />
      );
    });
  }

  return <div className="range-viewer">{gridView()}</div>;
}

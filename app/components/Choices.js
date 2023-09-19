import { actionsMap } from "../constants";

export default function Choices({ filteredScenarios, onChoiceChange }) {
  return (
    <div className="trainer-choices">
      {filteredScenarios.map((scenario) => {
        return (
          <button
            key={scenario.action + scenario.size}
            onClick={() => onChoiceChange([scenario.action, scenario.size])}
            type="button"
            className={`button button-${scenario.action.toLowerCase()} font-black active:translate-y-1`} // #todo constant logic
          >
            {scenario.action.charAt(0).toUpperCase() + scenario.action.slice(1)}
            &nbsp;{scenario.size ? scenario.size : ""}
          </button>
        );
      })}
    </div>
  );
}

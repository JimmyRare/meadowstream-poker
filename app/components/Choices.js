import { actionsMap } from "../constants";

export default function Choices({
  filteredScenarios,
  onChoiceChange,
  disabled,
}) {
  let sortedScenarios = Array(4);

  filteredScenarios.map((s) => {
    if (s.action == "fold") {
      sortedScenarios[0] = "Fold";
    }

    if (s.action == "call") {
      sortedScenarios[1] = "Call";
    }

    if (s.action == "raise" && s.size < 100) {
      sortedScenarios[2] = "Raise " + s.size;
    }

    if (s.action == "raise" && s.size == 100) {
      sortedScenarios[3] = "Allin";
    }
  });

  return (
    <div className="trainer-choices">
      {sortedScenarios.map((scenario) => {
        if (!scenario) return;
        return (
          scenario && (
            <button
              disabled={disabled}
              key={scenario}
              onClick={() => onChoiceChange(scenario)}
              type="button"
              className={`button button-${scenario.toLowerCase()} disabled:bg-gray disabled:translate-y-0 disabled:opacity-10 font-black active:translate-y-1`} // #todo constant logic
            >
              {scenario}
            </button>
          )
        );
      })}
    </div>
  );
}

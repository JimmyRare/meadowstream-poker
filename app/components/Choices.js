export default function Choices({ choices, onChoiceChange }) {
  return (
    <div className="trainer-choices">
      {choices.map((choice) => {
        if (choice == "Range") return;
        return (
          <button
            key={choice}
            onClick={() => onChoiceChange(choice)}
            type="button"
            className={`button button-${choice.toLowerCase()}`} // #todo constant logic
          >
            {choice}
          </button>
        );
      })}
    </div>
  );
}

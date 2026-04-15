import "../styles/FlagQuiz.css";

export default function FlagQuiz() {
  return (
    <div className="flag-quiz">
      <div className="flag-quiz-content">
        <span className="flag-quiz-header">
          <h2>Flag quiz</h2>
          <p>Guess the flag!</p>
        </span>
        <div className="flag-quiz-score">
          <span>
            <p>Score: </p>
            <p className="flag-quiz-score-strong">999</p>
          </span>
          <span>
            <p>Highscore: </p>
            <p className="flag-quiz-score-strong">999</p>
          </span>
        </div>
        <div className="flag-quiz-layout-wrapper">
          <span className="fi fi-se"></span>
          <div className="flag-quiz-answers">
            <button>Sweden</button>
            <button>Norway</button>
            <button>United Kingdom</button>
            <button>Romania</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

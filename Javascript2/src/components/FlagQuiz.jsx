import "../styles/FlagQuiz.css";

// Complete flag quiz component. It is imported in FlagQuizPage.jsx
// where all of the game logic is handled.
export default function FlagQuiz({
  score,
  highscore,
  currentFlag,
  answersArray,
  handleAnswerClick,
  selectedAnswer,
  rightAnswer,
  handleNextClick,
}) {
  return (
    <div className="flag-quiz">
      <div className="flag-quiz-content">
        <FlagQuizHeader />
        <FlagQuizScore score={score} highscore={highscore} />
        <div className="flag-quiz-layout-wrapper">
          <span className={`fi fi-${currentFlag}`}></span>
          <FlagQuizButtons
            answersArray={answersArray}
            handleAnswerClick={handleAnswerClick}
            selectedAnswer={selectedAnswer}
            rightAnswer={rightAnswer}
            handleNextClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
}

// Basic header
function FlagQuizHeader() {
  return (
    <span className="flag-quiz-header">
      <h2>Flag quiz</h2>
      <p>Guess the flag!</p>
    </span>
  );
}

// Renders the current score and highscore.
function FlagQuizScore({ score = "?", highscore = "?" }) {
  return (
    <div className="flag-quiz-score">
      <span>
        <p>Score: </p>
        <p className="flag-quiz-score-strong">{score}</p>
      </span>
      <span>
        <p>Highscore: </p>
        <p className="flag-quiz-score-strong">{highscore}</p>
      </span>
    </div>
  );
}

// Component that handles the rendering of the answer buttons,
// and the button to go to the next round. Dynamically handles
// assignment of CSS-classes to display right/wrong answers,
// disabling of buttons when they aren't supposed to be pressed,
// and dynamic font size based on the amount of characters in
// the answers (some place names had 40+ characters and wouldn't
// fit in the buttons).
function FlagQuizButtons({
  answersArray,
  handleAnswerClick,
  selectedAnswer,
  rightAnswer,
  handleNextClick,
}) {
  return (
    <div className="flag-quiz-buttons">
      {answersArray.map((answer) => (
        <button
          key={answer}
          onClick={() => handleAnswerClick(answer)}
          disabled={selectedAnswer !== null}
          className={
            answer === selectedAnswer
              ? answer === rightAnswer
                ? "right-answer"
                : "wrong-answer"
              : answer === rightAnswer && selectedAnswer !== null
                ? "right-answer"
                : selectedAnswer === null
                  ? ""
                  : "disabled"
          }
          style={
            answer.length < 23
              ? { fontSize: "clamp(1.3rem, 1.2333rem + 0.3556vw, 1.5rem)" }
              : {
                  fontSize: "clamp(0.9rem, -0.3rem + 2.4vw, 1.5rem)",
                }
          }>
          {answer}
        </button>
      ))}
      <button
        key="Next"
        onClick={handleNextClick}
        disabled={selectedAnswer === null}
        className={selectedAnswer === null ? "disabled" : ""}>
        Next
      </button>
    </div>
  );
}

import "../styles/FlagQuiz.css";
import { useCountriesStore } from "../store/countriesStore";
import { useState, useEffect } from "react";

export default function FlagQuiz() {
  const countries = useCountriesStore((state) => state.countries);
  const [currentCountry, setCurrentCountry] = useState(null);
  console.log("Flag Quiz Rendered");

  useEffect(() => {
    if (countries.length > 0) {
      setCurrentCountry(getRandomCountry(countries));
    }
  }, [countries]);

  if (!currentCountry) return <p>Loading...</p>;

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
          <span className={`fi fi-${currentCountry.code}`}></span>
          <div className="flag-quiz-answers">
            {currentCountry.answers.map((answer) => (
              <button key={answer}>{answer}</button>
            ))}
            <button
              onClick={() => setCurrentCountry(getRandomCountry(countries))}>
              Next
            </button>
          </div>
        </div>
        <p>{currentCountry.rightAnswer}</p>
        <p>{currentCountry.code}</p>
      </div>
    </div>
  );
}

function getRandomCountry(countries) {
  let indexArray = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * countries.length);
      console.log("Inside do block");
    } while (indexArray.includes(randomIndex));
    indexArray.push(randomIndex);
  }

  return {
    code: countries[indexArray[0]].code,
    rightAnswer: countries[indexArray[0]].name,
    answers: [
      countries[indexArray[0]].name,
      countries[indexArray[1]].name,
      countries[indexArray[2]].name,
      countries[indexArray[3]].name,
    ].sort(() => Math.random() - 0.5),
  };
}

import "../styles/FlagQuiz.css";
import { useCountriesStore } from "../store/countriesStore";
import FlagQuiz from "../components/FlagQuiz.jsx";
import { useState, useMemo, useEffect } from "react";

function filterCountries(countries) {
  const excludedCodes = [
    "bq",
    "bv",
    "gf",
    "gp",
    "hm",
    "yt",
    "re",
    "bl",
    "sh",
    "mf",
    "pm",
    "sj",
    "um",
    "wf",
    "cp",
    "gb",
    "io",
  ];

  const filteredCountries = countries.filter(
    (country) => !excludedCodes.includes(country.code),
  );

  return filteredCountries.map((country) => ({
    ...country,
    name: country.name.replace(/[,(].*/, "").trim(),
  }));
}

function getNewRound(countries) {
  let indexArray = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * countries.length);
    } while (indexArray.includes(randomIndex));
    indexArray.push(randomIndex);
  }

  return {
    flag: countries[indexArray[0]].code,
    rightAnswer: countries[indexArray[0]].name,
    answers: [
      countries[indexArray[0]].name,
      countries[indexArray[1]].name,
      countries[indexArray[2]].name,
      countries[indexArray[3]].name,
    ].sort(() => Math.random() - 0.5),
  };
}

export default function FlagQuizPage() {
  const rawCountries = useCountriesStore((state) => state.countries);
  const countries = filterCountries(rawCountries);
  const [currentRound, setCurrentRound] = useState(() =>
    countries.length > 0 ? getNewRound(countries) : null,
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    if (countries.length > 0 && !currentRound) {
      setCurrentRound(getNewRound(countries));
    }
  }, [countries, currentRound]);

  if (!currentRound) return <p>Loading...</p>;

  console.log("Right answer: " + currentRound.rightAnswer);
  console.log("Code: " + currentRound.flag);

  function handleAnswerClick(answer) {
    setSelectedAnswer(answer);

    if (answer === currentRound.rightAnswer) {
      setScore((prev) => prev + 1);
      if (score >= highscore) {
        setHighscore((prev) => prev + 1);
      }
    } else {
      setScore(0);
    }
  }

  function handleNextClick() {
    setSelectedAnswer(null);
    setCurrentRound(getNewRound(countries));
  }

  return (
    <div>
      <FlagQuiz
        score={score}
        highscore={highscore}
        currentFlag={currentRound.flag}
        answersArray={currentRound.answers}
        handleAnswerClick={handleAnswerClick}
        selectedAnswer={selectedAnswer}
        rightAnswer={currentRound.rightAnswer}
        handleNextClick={handleNextClick}
      />
    </div>
  );
}

import "../styles/FlagQuiz.css";
import { useCountriesStore } from "../store/countriesStore";
import FlagQuiz from "../components/FlagQuiz.jsx";
import { useState, useEffect } from "react";
import { getAllCountries } from "../api/countriesApi.js";

// Helper function that removes places with duplicate flags,
// manually overrides some place names, and trims all names
// to remove unnecessary information after trailing commas.
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

  const nameOverrides = {
    kp: "North Korea",
    kr: "South Korea",
    va: "Vatican City",
  };

  return countries
    .filter((country) => !excludedCodes.includes(country.code))
    .map((country) => ({
      ...country,
      name:
        nameOverrides[country.code] ??
        country.name.replace(/[,(].*/, "").trim(),
    }));
}

// Helper function that gets a new round. It returns an object
// that contains the following elements:
// * Two-digit country code used to render the correct flag
// * The correct answer corresponding to the country code
// * Array containing the correct answer and 3 wrong answers
//   in a randomized order (used for rendering answer buttons)
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

// Main page component
export default function FlagQuizPage() {
  const rawCountries = useCountriesStore((state) => state.countries);
  const setRawCountries = useCountriesStore((state) => state.setCountries);
  const countries = filterCountries(rawCountries);
  const [currentRound, setCurrentRound] = useState(() =>
    countries.length > 0 ? getNewRound(countries) : null,
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(
    Number(localStorage.getItem("highscore")),
  );
  const [error, setError] = useState("");

  // Gets all countries from the countries API and syncs them to
  // the global zustand variable in /store/countriesStore.js if
  // it is empty.
  useEffect(() => {
    if (countries.length > 0) return;

    async function loadCountries() {
      try {
        const data = await getAllCountries();
        setRawCountries(data);
      } catch (err) {
        setError(err.message);
      }
    }
    loadCountries();
  }, []);

  // Tries to start a new round if countries have loaded successfully,
  // and if there is no current round active.
  useEffect(() => {
    if (countries.length > 0 && !currentRound) {
      try {
        setCurrentRound(getNewRound(countries));
      } catch (err) {
        setError(err.message);
      }
    }
  }, [countries, currentRound]);

  if (error) return <p>{error}</p>;
  if (!currentRound) return <p>Loading...</p>;

  // Helper function that runs when clicking one of the answer buttons.
  // Changes the score based on if the answer was right/wrong, and also
  // updates the highscore if needed.
  function handleAnswerClick(answer) {
    setSelectedAnswer(answer);

    if (answer === currentRound.rightAnswer) {
      setScore((prev) => prev + 1);
      if (score >= highscore) {
        setHighscore((prev) => prev + 1);
        localStorage.setItem("highscore", (highscore + 1).toString());
      }
    } else {
      setScore(0);
    }
  }

  //
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

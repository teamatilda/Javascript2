# Country Info and Weather App

## Overview
A React-based single-page application for exploring country data, viewing weather information, and interacting with a flag quiz.
This project uses React and React Router to provide dynamic navigation and integrates external APIs to fetch country and weather data.

---

## Features
- View detailed information about countries
- Fetch and display weather data
- Client-side routing with dynamic parameters
- Interactive flag quiz
- Centralized state management using a custom store

---

## Project Structure

```bash
project-root/
├── public/
│   ├── cloudy.jpg
│   ├── favicon.svg
│   ├── icons.svg
│   ├── rain.jpg
│   ├── snow.jpg
│   ├── sunny.jpg
│   └── thunder.jpg
│
├── src/
│   ├── api/
│   │
│   ├── assets/
│   │   ├── Countries/
│   │   │   └── Stockholm.jpg
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── CountryCard.jsx
│   │   ├── CountryInfo.jsx
│   │   ├── FlagQuiz.jsx
│   │   ├── Navbar.jsx
│   │   └── WeatherWidget.jsx
│   │
│   ├── pages/
│   │   ├── CountryDetails.jsx
│   │   ├── CountryInfoDetails.jsx
│   │   └── FlagQuizPage.jsx
│   │
│   ├── store/
│   │   ├── countriesStore.js
│   │   └── filterStore.js
│   │
│   ├── styles/
│   │   ├── CountryCard.css
│   │   ├── CountryInfo.css
│   │   ├── FlagQuiz.css
│   │   ├── index.css
│   │   ├── Navbar.css
│   │   └── WeatherWidget.css
│   │
│   ├── Validators/
│   │   ├── countryValidation.js
│   │   └── weatherValidation.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/teamatilda/Javascript2
cd Javascript2
npm install
```

---

## Running the application

Start the development server:

```bash
npm run dev
```

---

## Routing

The application uses React Router for navigation.

* `/Country/:info`
    Displays detailed information for a selected country.

---

## APIs

The application relies on the following internal API modules:

* `countriesApi.js`

    * `getAllCountries()`
    * `getCountryBySlug()`

* `weatherApi.js`

    * `getWeather()`

These modules handle data fetching from external services.

---

## State Management

Global state is managed using a custom hook:

* `useCountriesStore`

This enables shared access to country-related data across components.

---

## Components

* `Navbar` - Provides navigation across the application
* `CountryInfo` - Displays summary data for a country
* `CountryInfoDetails` - Display detailed country information
* `WeatherWidget` - Displays weather information
* `FlagQuizPage` - Contains the quiz functionality

---

## Styling 

Styling is handled using standard CSS files:

* `Navbar.css`
* `WeatherWidget.css`

---

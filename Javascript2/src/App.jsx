import { useState } from 'react'
import "./Navbar.css";

import Navbar from "./Navbar";
import CountryInfo from './CountryInfo'

function App() {
  return (
    <>
      <Navbar />
      <CountryInfo />
    </>
  );
}

export default App;

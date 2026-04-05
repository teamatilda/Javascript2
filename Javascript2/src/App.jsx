import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect } from 'react'
import { getAllCountries, getCountryBySlug } from './api/countriesApi'

function App() {
  const [count, setCount] = useState(0)
  const [country, setCountry] = useState(null)

  // function for testing API
  useEffect(() => {
    async function testApi() {
      try {
        const countries = await getAllCountries()
        console.log("Countries:", countries)

        const firstCountry = countries[0]
        console.log("First country:", firstCountry)

        const fullCountry = await getCountryBySlug(firstCountry.slug)
        console.log("Full country raw:", fullCountry)

        setCountry(fullCountry)
        
      } catch (err) {
        console.error("Error:", err.message)
      }
    }

    testApi()
  }, [])

  return (
    <>
      {country && (
        <span className={`fi fi-${country.code.toLowerCase()}`}></span>
      )}
    </>
  )
}

export default App


import './CountryInfo.css'
import './index.css'
import WeatherWidget from './WeatherWidget'

export default function CountryInfo({ country }) {

    return (
        <section className="country-info-card">
            <div className="country-header">
                <h1 className="country-title">{country.name}</h1>
                <img src={country.image} alt={country.name} />
            </div>

            <div className="language-currency">
                    <InfoSection label="Language" value={country.language} />
                    <InfoSection label="Currency" value={country.currency} />
                    <InfoSection label= "Population" value={country.population} />
            </div>

            <div className="weather-widget">
                <WeatherWidget />
            </div>

            <div className="info-box">
                <h2>Title</h2>
                <p> Text here...{country.history}</p> 
            </div>
        </section>
    )
}


function InfoSection({ label, value }) {
    return (
        <div className="info-section">
            <h2 className="label">{label}</h2>
            <h2 className="value">{value}</h2>
        </div>
    )
}




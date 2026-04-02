
import Japan from '../src/assets/japan.jpg';
import './CountryInfo.css'
import './index.css'

function CountryInfo({ name, image, language, currency, history }) {

    const country = {
        name: "Japan",
        image: Japan,
        language: "Japanese",
        currency: "Yen",
    };

    return (
        <section className="CountryInfoCard">
            <div className="CountryHeader">
                <h1 className="CountryTitle">{country.name}</h1>
                <img className="CountryImage" src={country.image} alt={name}/>
            </div>

            <div className="LanguageCurrency">
                <div>
                    <h2 className="Label">Language</h2>
                    <h2 className="Value">{country.language}</h2>
                </div>
                <div>
                    <h2 className="Label">Currency</h2>
                    <h2 className="Value">{country.currency}</h2>
                </div>
            </div>

            <div className="WeatherWidget">
                {/* Här läggs väder-widgeten in */}
            </div>

            <div className="InfoBox">
                <p>{country.history}</p>
            </div>
        </section>
    )
}

export default CountryInfo;


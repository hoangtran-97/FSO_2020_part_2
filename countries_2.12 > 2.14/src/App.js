import React, {useState, useEffect} from "react";
import axios from "axios";

import "./App.css";
import Country from "./components/Country";

function App() {
    const [query, setQuery] = useState("");
    const [countries, setCountries] = useState([]);
    const [currentWeather, setCurrentWeather] = useState();

    const result = query ? countries.filter((country) => country.name.toLowerCase().includes(query.toLowerCase())) : [];
    const api_key = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
            setCountries(res.data);
        });
    }, []);

    const handleQuery = (event) => {
        setQuery(event.target.value);
    };

    // axios
    //     .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${result[0].capital}`)
    //     .then((res) => {
    //         setCurrentWeather(res.data.current);
    //     });
    return (
        <div className="App">
            <form>
                <div>
                    Find country: <input value={query} onChange={handleQuery}></input>
                </div>
            </form>
            <p>Result</p>
            {result.length > 10 ? (
                <p>Too many matches, specify another filter</p>
            ) : (
                <>
                    {result.length !== 1 && (
                        <>
                            {result.map((country) => (
                                <Country key={country.name} country={country}></Country>
                            ))}
                        </>
                    )}
                </>
            )}
            {result.length === 1 && (
                <>
                    <p>Country: {result[0].name}</p>
                    <p>Capital: {result[0].capital}</p>
                    <p>Population: {result[0].population}</p>
                    <p>Languages:</p>
                    <ul>
                        {result[0].languages.map((language) => (
                            <li key={language.name}>{language.name}</li>
                        ))}
                    </ul>
                    <img src={result[0].flag} alt="flag" className="country_flag"></img>
                    {/* {currentWeather && (
                        <>
                            <p>Temp: {currentWeather.temperature}</p>
                            <img src={currentWeather.weather_icons[0]} alt="flag" className="country_flag"></img>
                            <p>
                                Wind {currentWeather.wind_speed} {currentWeather.wind_dir}
                            </p>
                        </>
                    )} */}
                </>
            )}
        </div>
    );
}

export default App;

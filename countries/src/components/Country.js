import React, {useState} from "react";

const Country = ({country}) => {
    const [isVisible, setIsvisible] = useState(false);

    return (
        <>
            <h3>{country.name}</h3>
            {isVisible && (
                <div>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
                    <p>Languages:</p>
                    <ul>
                        {country.languages.map((language) => (
                            <li key={language.name}>{language.name}</li>
                        ))}
                    </ul>
                    <img src={country.flag} alt="flag" className="country_flag"></img>
                </div>
            )}
            <button onClick={() => setIsvisible(!isVisible)}>{isVisible ? "Hide" : "Show"}</button>
        </>
    );
};

export default Country;

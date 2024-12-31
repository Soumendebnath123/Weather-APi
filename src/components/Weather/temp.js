import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Pune");
  const [tempInfo, setTempInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const getWeatherInfo = async () => {
    try {
      const apiKey = "524ac4c2b70b063349c706d07f1e848c"; // Replace with your valid API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${apiKey}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`City not found: ${searchValue}`);
      }

      const data = await res.json();

      // Destructure weather data
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not fetch weather data. Please check the city name.");
      setTempInfo({});
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []); // Initial fetch on component mount

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search city..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* Error message display */}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* Temperature card display */}
      {Object.keys(tempInfo).length > 0 ? (
        <Weathercard {...tempInfo} />
      ) : (
        !errorMessage && <p>Loading weather information...</p>
      )}
    </>
  );
};

export default Temp;
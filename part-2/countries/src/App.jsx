import axios from "axios";
import { useState, useEffect } from "react";
import Country from "./components/Country";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [shownCountry, setShownCountry] = useState("");

  const COUNTRIES_API_URL =
    "https://studies.cs.helsinki.fi/restcountries/api/all";

  const fetchCountryData = () => {
    axios
      .get(COUNTRIES_API_URL)
      .then((response) => setCountries(response.data))
      .catch((error) =>
        console.error("Error when fetching country data:", error)
      );
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;

    setQuery(newQuery);

    setFilteredCountries(
      countries.filter(({ name: { common } }) =>
        common.toLowerCase().includes(newQuery)
      )
    );

    if (shownCountry) setShownCountry("");
  };

  const handleShowClick = (country) =>
    setShownCountry(<Country country={country} />);

  const renderCountries = () => {
    const filteredCount = filteredCountries.length;

    if (query && filteredCount > 10) {
      return "Too many matches, specify another filter";
    }

    if (filteredCount === 1) {
      return <Country country={filteredCountries[0]} />;
    }

    if (filteredCount < 10) {
      return (
        <Countries
          countries={filteredCountries}
          handleShowClick={handleShowClick}
        />
      );
    }
  };

  return (
    <main>
      <form>
        <label>
          find countries <input value={query} onChange={handleQueryChange} />
        </label>
      </form>
      {shownCountry || renderCountries()}
    </main>
  );
};

export default App;

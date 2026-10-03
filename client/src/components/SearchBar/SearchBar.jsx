import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const trimmedCity = city.trim();

    if (trimmedCity === "") {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    onSearch(trimmedCity);
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);

    // Remove error as soon as the user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <section className="search-section">
      <h1 className="search-section__title">How's the sky looking today?</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <img src="/assets/images/icon-search.svg" alt="" />

          <label htmlFor="city-search" className="visually-hidden">
            Search for a city
          </label>

          <input
            id="city-search"
            type="text"
            placeholder="Search for a place..."
            value={city}
            onChange={handleInputChange}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "search-error" : undefined}
          />
        </div>

        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <p id="search-error" className="search-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

export default SearchBar;

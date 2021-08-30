import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log({ error }));
  }, []);
  return (
    <Router>
      <div className="App">
        <h1>React Countries App</h1>
        <Route path="/" exact
          render={() => {
            return (
              countries.map((country, i) => (
                <div key={i} className={country}>
                  <Link to={`/country/${country.alpa3Code}`}>
                    <h2>{country.name}</h2>
                  </Link>
                </div>
              ))
            );
          }}
        />

        <Route
          path="/country/:code"
          render={(renderProps) => {
            const country = countries.find(country => country.alpa3Code === renderProps.match.params.code);
            return <Country {...renderProps} country={country} />
          }}
        />
      </div>
    </Router>
  );
}


const Country = props => {
  return (
    <div>
      {props.country.flag}
    </div>
  )
}
import React from 'react';
import './CountryCard.css';

const CountryCard = ({ country }) => {
  return (
    <div className="country-card">
      <img src={country.flagImage} alt={country.name} />
      <h2>{country.name}</h2>
      <p>{country.continent}</p>
    </div>
  );
};

export default CountryCard;

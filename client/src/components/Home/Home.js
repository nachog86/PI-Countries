import React, { useState, useEffect } from 'react';
import {getAllCountries} from '../../services/api';
import SearchBar from './SearchBar';
import CountryCard from './CountryCard';
import FilterButtons from './FilterButtons';
import SortButtons from './SortButton';
import Pagination from './Pagination';
import './Home.css'; // Importamos los estilos

const Home = () => {
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await getAllCountries();
        setCountries(data);
      };
  
      fetchData();
    }, []);
  
    // Ahora, `countries` contiene los datos de los países desde tu API
    // Puedes pasar estos datos a los subcomponentos como props
  
    return (
      <div className="home">
        <SearchBar />
        {countries.map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
        <FilterButtons />
        <SortButtons />
        <Pagination />
      </div>
    );
  };
  
  export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import yourGif from '../../assets/images/alb_glob0401_1080p_24fps.mp4';

function Landing() {
    return (
        <div className="landing">
            <h1>Bienvenido a Henry Countries!</h1>
            <img src={yourGif} alt="Imagen descriptiva" />
            <Link to="/home">
                <button>Ingresa a la Home Page</button>
            </Link>
        </div>
    );
}

export default Landing;


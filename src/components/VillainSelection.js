import React from 'react';
import { useState, useEffect } from 'react';
import '../assets/styles/styles.css';

// Importa las imágenes locales
import tiax from '../assets/images/villains/tiax.png';
import vampira from '../assets/images/villains/vampira.png';
import gnomo from '../assets/images/villains/gnomo.png';
import sauron from '../assets/images/villains/sauron.png';
import metadona from '../assets/images/villains/metadona.png';
import { getVillains } from './api.js';

const villainImages = {
  'Tiax': tiax,
  'Vampira Alcoholica': vampira,
  'Gnomo Cabron': gnomo,
  'Sauron': sauron,
  'MetaDonna': metadona,
};

const VillainSelection = function ({ onVillainSelect }) {
  const [villains, setVillains] = useState([]);

  useEffect(() => {
    getVillains().then(setVillains).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Selecciona un Villano</h1>
      <div className="container">
        {villains.map((villain) => (
          <div
            key={villain.id}
            className="card"
            onClick={() => onVillainSelect(villain)}
          >
            <img
              src={villainImages[villain.Nombre]}
              alt={villain.Nombre}
            />
            <p>{villain.Nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VillainSelection;

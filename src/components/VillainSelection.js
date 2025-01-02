import React, { useState, useEffect } from 'react';
import { getVillains } from './api';

const VillainSelection = ({ onVillainSelect }) => {
  const [villains, setVillains] = useState([]);

  useEffect(() => {
    getVillains().then(setVillains).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Selecciona un Villano</h1>
      <ul>
        {villains.map((villain) => (
          <li key={villain.idVillanos}>
            <button onClick={() => onVillainSelect(villain)}>
              {villain.Nombre} - {villain.Alias}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VillainSelection;

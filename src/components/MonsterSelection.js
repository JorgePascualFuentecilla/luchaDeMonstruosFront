import React from 'react';
import { useState, useEffect } from 'react';
import { getMonsters } from './api.js';
import '../assets/styles/styles.css';

// Importa las imágenes locales
import PokemonRealista from '../assets/images/monsters/PokemonRealista.jpg';
import PitufoDelKaos from '../assets/images/monsters/PitufoDelKaos.jpg';
import CaperucitaLoca from '../assets/images/monsters/CaperucitaLoca.jpg';
import MercenarioInformatico from '../assets/images/monsters/MercenarioInformatico.gif';
import MakinaRata from '../assets/images/monsters/MakinaRata.jpg';

const monsterImages = {
  'Pika Pika (y no me puedo rascar)': PokemonRealista,
  'Pitufo del Kaos': PitufoDelKaos,
  'Caperucita Loca': CaperucitaLoca,
  'Mercenario Informatico': MercenarioInformatico,
  'MakinaRata': MakinaRata,
};

const MonsterSelection = function ({ onMonsterSelect }) {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    getMonsters().then(setMonsters).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Selecciona un Monstruo</h1>
      <div className="container">
        {monsters.map((monster) => (
          <div
            key={monster.id}
            className="card"
            onClick={() => onMonsterSelect(monster)}
          >
            <img
              src={monsterImages[monster.Nombre]}
              alt={monster.Nombre}
            />
            <p>{monster.Nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonsterSelection;

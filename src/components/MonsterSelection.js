import React, { useState, useEffect } from 'react';
import { getMonsters } from './api';

const MonsterSelection = ({ villain, onMonsterSelect }) => {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    getMonsters().then(setMonsters).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Selecciona un Monstruo para {villain.Nombre}</h1>
      <ul>
        {monsters.map((monster) => (
          <li key={monster.idMonstruos}>
            <button onClick={() => onMonsterSelect(monster)}>
              {monster.Nombre}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonsterSelection;

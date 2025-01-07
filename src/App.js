import React, { useState } from 'react';
import VillainSelection from './components/VillainSelection';
import MonsterSelection from './components/MonsterSelection';
import Battle from './components/Battle';
import { getVillains, getMonsters } from './components/api';

const App = () => {
  const [selectedVillain, setSelectedVillain] = useState(null); // Villano seleccionado por el jugador
  const [selectedMonster, setSelectedMonster] = useState(null); // Monstruo seleccionado por el jugador
  const [rival, setRival] = useState(null); // Rival generado automáticamente

  // Maneja la selección de un villano por parte del jugador
  const handleVillainSelect = (villain) => {
    setSelectedVillain(villain);
    setSelectedMonster(null); // Reinicia el monstruo seleccionado si el villano cambia
  };

  // Maneja la selección de un monstruo por parte del jugador
  const handleMonsterSelect = async (monster) => {
    setSelectedMonster(monster);

    // Genera el rival automáticamente
    const [villains, monsters] = await Promise.all([getVillains(), getMonsters()]);
    const randomVillain = villains[Math.floor(Math.random() * villains.length)];
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
    setRival({ villain: randomVillain, monster: randomMonster });
  };

  // Si el jugador aún no ha seleccionado un villano
  if (!selectedVillain) {
    return <VillainSelection onVillainSelect={handleVillainSelect} />;
  }

  // Si el jugador ha seleccionado un villano pero no un monstruo
  if (!selectedMonster) {
    return (
      <MonsterSelection
        villain={selectedVillain}
        onMonsterSelect={handleMonsterSelect}
      />
    );
  }

  // Si el rival aún no ha sido generado
  if (!rival) {
    return <p>Generando rival...</p>;
  }

  // Si el jugador ha seleccionado su equipo y el rival está listo
  return (
    <Battle
      villain={selectedVillain}
      monster={selectedMonster}
      rival={rival}
    />
  );
};

export default App;

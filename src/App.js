import React, { useState } from 'react';
import VillainSelection from './components/VillainSelection';
import MonsterSelection from './components/MonsterSelection';

const App = () => {
  const [selectedVillain, setSelectedVillain] = useState(null);

  const handleVillainSelect = (villain) => {
    setSelectedVillain(villain);
  };

  const handleMonsterSelect = (monster) => {
    console.log('Villano:', selectedVillain);
    console.log('Monstruo:', monster);
    alert(`${selectedVillain.Nombre} eligió a ${monster.Nombre}`);
  };

  return (
    <div>
      {!selectedVillain ? (
        <VillainSelection onVillainSelect={handleVillainSelect} />
      ) : (
        <MonsterSelection
          villain={selectedVillain}
          onMonsterSelect={handleMonsterSelect}
        />
      )}
    </div>
  );
};

export default App;


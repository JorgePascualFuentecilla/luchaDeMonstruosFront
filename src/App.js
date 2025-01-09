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
    const bonificaciones = villain.BonificacionVillanos.reduce(
      (acc, bonificacion) => {
        switch (bonificacion.NombreBonificacion) {
          case 'Fuerza del Caos':
          case 'Aura Glacial':
          case 'Manto de Oscuridad':
            acc.bonificacionAtaque = bonificacion.Valor;
            break;
          case 'Placas de Acero':
            acc.bonificacionDefensa = bonificacion.Valor;
            break;
          case 'Toxina Extrema':
            acc.bonificacionVida = bonificacion.Valor;
            break;
          default:
            break;
        }
        return acc;
      },
      { bonificacionVida: 0, bonificacionAtaque: 0, bonificacionDefensa: 0 }
    );

    setSelectedVillain({
      ...villain,
      ...bonificaciones,
    });

    setSelectedMonster(null); // Reinicia el monstruo seleccionado si el villano cambia
  };

  // Procesa los atributos y poderes de un monstruo
  const processMonster = (monster) => {
    const atributos = monster.AtributosMonstruos.reduce((acc, atributo) => {
      const valor = parseInt(atributo.AtributosMonstruos_has_Monstruos.Valor, 10);
      switch (atributo.Nombre) {
        case 'Ataque':
          acc.ataque = valor;
          break;
        case 'Defensa':
          acc.defensa = valor;
          break;
        case 'Puntos de Vida':
          acc.vida = valor + 300; // Agregar 300 puntos de vida base
          break;
        default:
          break;
      }
      return acc;
    }, { ataque: 0, defensa: 0, vida: 0 });

    return {
      ...monster,
      ...atributos,
      poder: monster.Poderes[0]?.NombrePoderes || 'Sin poder',
    };
  };

  // Maneja la selección de un monstruo por parte del jugador
  const handleMonsterSelect = async (monster) => {
    const processedMonster = processMonster(monster);
    setSelectedMonster(processedMonster);

    // Genera el rival automáticamente
    const [villains, monsters] = await Promise.all([getVillains(), getMonsters()]);
    const randomVillain = villains[Math.floor(Math.random() * villains.length)];

    const rivalBonificaciones = randomVillain.BonificacionVillanos.reduce(
      (acc, bonificacion) => {
        switch (bonificacion.NombreBonificacion) {
          case 'Fuerza del Caos':
          case 'Aura Glacial':
          case 'Manto de Oscuridad':
            acc.bonificacionAtaque = bonificacion.Valor;
            break;
          case 'Placas de Acero':
            acc.bonificacionDefensa = bonificacion.Valor;
            break;
          case 'Toxina Extrema':
            acc.bonificacionVida = bonificacion.Valor;
            break;
          default:
            break;
        }
        return acc;
      },
      { bonificacionVida: 0, bonificacionAtaque: 0, bonificacionDefensa: 0 }
    );

    const randomMonster = processMonster(monsters[Math.floor(Math.random() * monsters.length)]);

    setRival({
      villain: {
        ...randomVillain,
        ...rivalBonificaciones,
      },
      monster: randomMonster,
    });
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

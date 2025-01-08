import React, { useState, useEffect } from 'react';
import PokemonRealista from '../assets/images/monsters/PokemonRealista.jpg';
import PitufoDelKaos from '../assets/images/monsters/PitufoDelKaos.jpg';
import CaperucitaLoca from '../assets/images/monsters/CaperucitaLoca.jpg';
import MercenarioInformatico from '../assets/images/monsters/MercenarioInformatico.gif';
import MakinaRata from '../assets/images/monsters/MakinaRata.jpg';
import tiax from '../assets/images/villains/tiax.png';
import vampira from '../assets/images/villains/vampira.png';
import gnomo from '../assets/images/villains/gnomo.png';
import sauron from '../assets/images/villains/sauron.png';
import metadona from '../assets/images/villains/metadona.png';

// Mapas de imágenes
const monsterImages = {
  'Pika Pika (y no me puedo rascar)': PokemonRealista,
  'Pitufo del Kaos': PitufoDelKaos,
  'Caperucita Loca': CaperucitaLoca,
  'Mercenario Informatico': MercenarioInformatico,
  'MakinaRata': MakinaRata,
};

const villainImages = {
  'Tiax': tiax,
  'Vampira Alcoholica': vampira,
  'Gnomo Cabron': gnomo,
  'Sauron': sauron,
  'MetaDonna': metadona,
};

// Componente Battle
const Battle = ({ villain, monster, rival }) => {
  useEffect(() => {
    if (!villain || !monster || !rival || !rival.monster || !rival.villain) {
      console.error('Datos insuficientes para iniciar el combate');
    }
  }, [villain, monster, rival]);

  // Vida inicial del jugador y el rival
  const playerHP = monster?.vida + (villain?.bonificacionVida || 0);
  const opponentHP = rival?.monster?.vida + (rival?.villain?.bonificacionVida || 0);

  const [currentPlayerHP, setCurrentPlayerHP] = useState(playerHP || 0);
  const [currentOpponentHP, setCurrentOpponentHP] = useState(opponentHP || 0);

  const [log, setLog] = useState([]);

  const calculateDamage = (attacker, defender, bonusAttack = 0, bonusDefense = 0) => {
    if (!attacker || !defender) return 0;
  
    const totalAttack = attacker.ataque + bonusAttack;
  
    // Calculo de la probabilidad de fallo
    const failChance = Math.min(totalAttack / 100, 0.2); // Máximo 20% de fallo
    const attackRoll = Math.random();
  
    if (attackRoll < failChance) {
      return 0;
    }
  
    // Calcular daño si el ataque acierta
    const damage = Math.max(totalAttack - defender.defensa - bonusDefense, 0);
    return damage;
  };
  

  const handleAttack = () => {
    if (!monster || !villain || !rival?.monster || !rival?.villain) return;
  
    const playerDamage = calculateDamage(
      monster,
      rival.monster,
      villain.bonificacionAtaque,
      rival.villain.bonificacionDefensa
    );
  
    const opponentDamage = calculateDamage(
      rival.monster,
      monster,
      rival.villain.bonificacionAtaque,
      villain.bonificacionDefensa
    );
  
    setCurrentOpponentHP((prev) => Math.max(prev - playerDamage, 0));
    setCurrentPlayerHP((prev) => Math.max(prev - opponentDamage, 0));
  
    setLog((prev) => [
      ...prev,
      playerDamage === 0
        ? 'Tu monstruo falló el ataque.'
        : `Tu monstruo inflige ${playerDamage} de daño.`,
      opponentDamage === 0
        ? 'El monstruo enemigo falló el ataque.'
        : `El monstruo enemigo inflige ${opponentDamage} de daño.`,
    ]);
  };
  
  if (!villain || !monster || !rival || !rival.monster || !rival.villain) {
    return <h2>Datos insuficientes para el combate. Asegúrate de seleccionar un villano y un monstruo correctamente.</h2>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>¡Batalla!</h1>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Equipo del jugador */}
        <div style={{ textAlign: 'center' }}>
          <h2>{villain.Nombre}</h2>
          <img
            src={villainImages[villain.Nombre] || 'default-villain.png'}
            alt={`Retrato de ${villain.Nombre}`}
            style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }}
          />
          <h3>{monster.Nombre}</h3>
          <img
            src={monsterImages[monster.Nombre] || 'default-monster.png'}
            alt={`Retrato de ${monster.Nombre}`}
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
          <p>Vida: {currentPlayerHP}</p>
          <p>Ataque: {monster.ataque} (Bonificación: {villain.bonificacionAtaque})</p>
          <p>Defensa: {monster.defensa} (Bonificación: {villain.bonificacionDefensa})</p>
        </div>

        <h2 style={{ fontSize: '2rem', margin: '20px' }}>VS</h2>

        {/* Equipo del rival */}
        <div style={{ textAlign: 'center' }}>
          <h2>{rival.villain.Nombre}</h2>
          <img
            src={villainImages[rival.villain.Nombre] || 'default-villain.png'}
            alt={`Retrato de ${rival.villain.Nombre}`}
            style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }}
          />
          <h3>{rival.monster.Nombre}</h3>
          <img
            src={monsterImages[rival.monster.Nombre] || 'default-monster.png'}
            alt={`Retrato de ${rival.monster.Nombre}`}
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
          <p>Vida: {currentOpponentHP}</p>
          <p>Ataque: {rival.monster.ataque} (Bonificación: {rival.villain.bonificacionAtaque})</p>
          <p>Defensa: {rival.monster.defensa} (Bonificación: {rival.villain.bonificacionDefensa})</p>
        </div>
      </div>

      {/* Botón de ataque o mensaje de resultado */}
      {currentPlayerHP > 0 && currentOpponentHP > 0 ? (
        <button onClick={handleAttack} style={{ marginTop: '20px' }}>Atacar</button>
      ) : (
        <h2 style={{ marginTop: '20px' }}>
          {currentPlayerHP > 0 ? '¡Ganaste el combate!' : 'Perdiste. Intenta nuevamente.'}
        </h2>
      )}

      {/* Registro del combate */}
      <div style={{ marginTop: '30px' }}>
        <h2>Registro de Combate</h2>
        <ul>
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Battle;

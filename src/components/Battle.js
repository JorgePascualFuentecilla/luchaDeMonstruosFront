import React, { useState, useEffect } from 'react';

const Battle = ({ villain, monster, rival }) => {
  // Validar si los datos están disponibles
  useEffect(() => {
    if (!villain || !monster || !rival || !rival.monster || !rival.villain) {
      console.error('Datos insuficientes para iniciar el combate');
    }
  }, [villain, monster, rival]);

  // Vida inicial del jugador (monstruo + bonificación del villano)
  const playerHP = monster?.vida + (villain?.bonificacionVida || 0);
  const opponentHP = rival?.monster?.vida + (rival?.villain?.bonificacionVida || 0);

  const [currentPlayerHP, setCurrentPlayerHP] = useState(playerHP || 0);
  const [currentOpponentHP, setCurrentOpponentHP] = useState(opponentHP || 0);

  const [log, setLog] = useState([]);

  const calculateDamage = (attacker, defender, bonusAttack = 0, bonusDefense = 0) => {
    if (!attacker || !defender) return 0;
    const damage = Math.max(attacker.ataque + bonusAttack - defender.defensa - bonusDefense, 0);
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
      `Tu monstruo inflige ${playerDamage} de daño.`,
      `El monstruo enemigo inflige ${opponentDamage} de daño.`,
    ]);
  };

  if (!villain || !monster || !rival || !rival.monster || !rival.villain) {
    return <h2>Datos insuficientes para el combate. Asegúrate de seleccionar un villano y un monstruo correctamente.</h2>;
  }

  return (
    <div>
      <h1>Combate</h1>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {/* Información del jugador */}
        <div>
          <h2>Tu Monstruo</h2>
          <p><strong>{monster.Nombre}</strong></p>
          <p>Vida: {currentPlayerHP}</p>
          <p>Ataque: {monster.ataque} (Bonificación: {villain.bonificacionAtaque})</p>
          <p>Defensa: {monster.defensa} (Bonificación: {villain.bonificacionDefensa})</p>
        </div>

        {/* Información del oponente */}
        <div>
          <h2>Monstruo Enemigo</h2>
          <p><strong>{rival.monster.Nombre}</strong></p>
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

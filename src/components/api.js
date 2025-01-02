const API_BASE = 'http://localhost:3001/api'

export const getVillains = async () => {
  const response = await fetch(`${API_BASE}/villanos`);
  return response.json();
};

export const getMonsters = async () => {
  const response = await fetch(`${API_BASE}/monstruos`);
  return response.json();
};

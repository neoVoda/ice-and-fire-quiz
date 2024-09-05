// src/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://anapioficeandfire.com/api';

export const getCharacters = async (count: number) => {
  const promises = Array.from({ length: count }, async () => {
    let character;
    do {
      const randomId = Math.floor(Math.random() * 2133) + 1;
      const response = await axios.get(`${API_BASE_URL}/characters/${randomId}`);
      character = response.data;
    } while (!character.aliases || character.aliases.length === 0);
    return character;
  });

  try {
    const responses = await Promise.all(promises);
    return responses;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw new Error('Failed to fetch characters');
  }
};

// src/quiz.ts
import { getCharacters } from './api.ts';

let charactersCache: any[] = [];

const fetchCharacters = async () => {
  if (charactersCache.length < 10) {
    charactersCache = await getCharacters(20);
  }
};

const getRandomCharacterFromCache = () => {
  return charactersCache.pop();
};

const generateRandomAliases = (correctAlias: string, characters: any[]) => {
  const aliases = [correctAlias];
  while (aliases.length < 4) {
    const character = characters.pop();
    if (character) {
      const alias = character.aliases[0] || 'No alias';
      if (!aliases.includes(alias)) {
        aliases.push(alias);
      }
    }
  }
  return aliases.sort(() => Math.random() - 0.5); // Shuffle options
};

export const generateQuestion = async () => {
  await fetchCharacters();
  const character = getRandomCharacterFromCache();
  const options = generateRandomAliases(character.aliases[0] || 'No alias', charactersCache);

  return {
    question: `What is the alias of ${character.name}?`,
    options,
    answer: character.aliases[0] || 'No alias',
  };
};

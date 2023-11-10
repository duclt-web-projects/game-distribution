import { defineStore } from 'pinia';
import { IGameLocal } from '~/types/game';

const getDataFromLocalStorage = () => {
  if (process.client) {
    const yourGamesLocal = localStorage.getItem('your-games');

    return yourGamesLocal ? JSON.parse(yourGamesLocal) : [];
  }

  return [];
};

export const useYourGamesStore = defineStore('your-games', () => {
  const yourGames = ref<IGameLocal[]>([]);

  function getGames() {
    return getDataFromLocalStorage();
  }

  function addGames(game: IGameLocal) {
    const isExist = yourGames.value.find((item) => item.id === game.id);

    if (!isExist) {
      yourGames.value.push({
        id: game.id,
        name: game.name,
        slug: game.slug,
        thumbnail: game.thumbnail,
      });

      localStorage.setItem('your-games', JSON.stringify(yourGames.value));
    }
  }

  function removeGames(gameId: string | number) {
    const newYourGames = this.getGames().filter((item) => item.id !== gameId);

    yourGames.value = newYourGames;

    localStorage.setItem('your-games', JSON.stringify(newYourGames));
  }

  return {
    yourGames,
    addGames,
    removeGames,
    getGames,
  };
});

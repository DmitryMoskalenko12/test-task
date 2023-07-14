import { create } from 'zustand'
import { getRecieps } from '../helpers/getRecipes'

export const useRecipes = create((set, get) => ({
  recipes: [],
  oneRecipe: [],
  proccess: 'idle',
  limit: 15,
  fetchRecipes: async () => {
    set({proccess: 'loading'})
    try {
     const response = await getRecieps(`https://api.punkapi.com/v2/beers?page=1&per_page=${get().limit}`);
     set({ recipes: response })
    } catch (error) {
      set(({proccess: 'error'}))
    }
  },
  fetchOneRecipe: async (id) => {
    set(({proccess: 'loading'}));
    try {
      const response = await getRecieps(`https://api.punkapi.com/v2/beers/${id}`);
      set(({oneRecipe: response}))
    } catch (error) {
      set(({proccess: 'error'}))
    }
  }
}))
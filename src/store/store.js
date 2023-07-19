import { create } from 'zustand'
import { getRecieps } from '../helpers/getRecipes'
import {persist} from 'zustand/middleware';

export const useRecipes = create((set, get) => ({
  recipes: [],
  oneRecipe: [],
  selectedRecipes: [],
  proccess: 'idle',
  limit: 25,
  leftOffset: 0,
  rightOffset: 5,
  deleteItemsAll: [],
  page: 1,
  fetchRecipes: async (page = 1) => {

    set({proccess: 'loading'})
    try {
     const response = await getRecieps(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${get().limit}`);
     set({ recipes: response, proccess: 'fulfiled' })
    } catch (error) {
      set({proccess: 'rejected'})
    }
  },
  fetchOneRecipe: async (id) => {
    set({proccess: 'loading'});
    try {
      const response = await getRecieps(`https://api.punkapi.com/v2/beers/${id}`);
      set({oneRecipe: response, proccess: 'fulfiled'})
    } catch (error) {
      set({proccess: 'rejected'})
    }
  },
  toggleSelectedRecipe: (id) => set(state => {
   const cloneRecipes = state.recipes;
   const selectedRecipe = cloneRecipes.find(item => item.id === id);
   if (state.selectedRecipes.includes(selectedRecipe)) {
    return {selectedRecipes: state.selectedRecipes.filter(item => item.id !== id)}
   } else {
    return {selectedRecipes: [...state.selectedRecipes, selectedRecipe]}
   }
  }),
  deleteAll: () => set(state => {
    const getAllRecipes = state.recipes;
    const selectedRecipes = state.selectedRecipes;
    const forRender = getAllRecipes.filter(item => !selectedRecipes.includes(item))
    const deleteItems = getAllRecipes.filter(item => selectedRecipes.includes(item))
    return {recipes: forRender, selectedRecipes: [], deleteItemsAll: [...get().deleteItemsAll, ...deleteItems]}
  }),
  setPage: () => {
    set({page: get().page + 1})
  },
  setRecipes: (data) => {
    set({recipes: data})
  },
  setLeftOffset: () => {
    set({leftOffset: get().leftOffset + 5 })
  },
  setRightOffset: () => {
    set({rightOffset: get().rightOffset + 5 })
  },
  resetLeftOffset: (dec) => {
    set({leftOffset: -5 - dec })
  },
  resetRightOffset: (dec) => {
    set({rightOffset: 0 - dec })
  },
  resetItemsAll: () => {
    set({deleteItemsAll: []})
  }

  
}))
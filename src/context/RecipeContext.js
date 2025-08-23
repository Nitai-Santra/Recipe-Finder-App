import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RecipeContext = createContext();

const initialState = {
  recipes: [],
  favorites: [],
  loading: false,
  error: null,
  searchQuery: '',
  dietFilters: [],
};

function recipeReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_RECIPES':
      return { ...state, recipes: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_DIET_FILTERS':
      return { ...state, dietFilters: action.payload };
    case 'ADD_TO_FAVORITES':
      // Check if already in favorites to avoid duplicates
      if (state.favorites.some(fav => fav.id === action.payload.id)) {
        return state;
      }
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(recipe => recipe.id !== action.payload),
      };
    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}

export function RecipeProvider({ children }) {
  const [savedFavorites, setSavedFavorites] = useLocalStorage('recipeFavorites', []);
  const [state, dispatch] = useReducer(recipeReducer, {
    ...initialState,
    favorites: savedFavorites,
  });

  // Sync favorites with localStorage
  useEffect(() => {
    setSavedFavorites(state.favorites);
  }, [state.favorites, setSavedFavorites]);

  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
}
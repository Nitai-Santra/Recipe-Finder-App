import React, { useState } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import { searchRecipes } from '../../utils/api';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { state, dispatch } = useRecipe();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });

    try {
      const recipes = await searchRecipes(query, state.dietFilters);
      dispatch({ type: 'SET_RECIPES', payload: recipes });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes (e.g., chicken, pasta)..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
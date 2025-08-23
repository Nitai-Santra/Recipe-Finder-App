import React, { useEffect } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import { searchRecipes } from '../../utils/api';
import styles from './Filters.module.css';

const dietOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'glutenFree', label: 'Gluten Free' },
  { value: 'dairyFree', label: 'Dairy Free' },
  { value: 'ketogenic', label: 'Ketogenic' },
  { value: 'paleo', label: 'Paleo' },
];

const Filters = () => {
  const { state, dispatch } = useRecipe();

  // Apply filters when they change
  useEffect(() => {
    if (state.searchQuery) {
      applyFilters();
    }
  }, [state.dietFilters]); // Only re-run when dietFilters change

  const applyFilters = async () => {
    if (!state.searchQuery) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const recipes = await searchRecipes(state.searchQuery, state.dietFilters);
      dispatch({ type: 'SET_RECIPES', payload: recipes });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  };

  const handleFilterChange = (diet) => {
    const newFilters = state.dietFilters.includes(diet)
      ? state.dietFilters.filter(f => f !== diet)
      : [...state.dietFilters, diet];
    
    dispatch({ type: 'SET_DIET_FILTERS', payload: newFilters });
  };

  return (
    <div className={styles.filters}>
      <h3 className={styles.title}>Dietary Filters</h3>
      <div className={styles.filterGrid}>
        {dietOptions.map(option => (
          <label key={option.value} className={styles.filterLabel}>
            <input
              type="checkbox"
              checked={state.dietFilters.includes(option.value)}
              onChange={() => handleFilterChange(option.value)}
              className={styles.filterCheckbox}
            />
            <span className={styles.filterText}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
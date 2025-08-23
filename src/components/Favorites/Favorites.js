import React, { useState } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipeModal from '../RecipeModal/RecipeModal';
import styles from './Favorites.module.css';

const Favorites = () => {
  const { state } = useRecipe();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if (state.favorites.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>❤️</div>
        <h2>No favorites yet</h2>
        <p>Start adding recipes to your favorites by clicking the heart icon</p>
      </div>
    );
  }

  return (
    <div className={styles.favorites}>
      <h1 className={styles.title}>Your Favorite Recipes</h1>
      <p className={styles.subtitle}>{state.favorites.length} saved recipes</p>
      
      <div className={styles.favoritesGrid}>
        {state.favorites.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>
      
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Favorites;
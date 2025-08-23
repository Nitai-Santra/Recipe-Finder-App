import React, { useState } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { state, dispatch } = useRecipe();
  const isFavorite = state.favorites.some(fav => fav.id === recipe.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: recipe.id });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: recipe });
    }
  };

  return (
    <div className={styles.recipeCard} onClick={onClick}>
      <div className={styles.imageContainer}>
        {!imageLoaded && <div className={styles.imagePlaceholder} />}
        <img
          src={recipe.image}
          alt={recipe.title}
          className={styles.recipeImage}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        {recipe.readyInMinutes && (
          <div className={styles.cookingTime}>
            ⏱ {recipe.readyInMinutes} min
          </div>
        )}
      </div>
      <div className={styles.recipeInfo}>
        <h3 className={styles.recipeTitle}>{recipe.title}</h3>
        <div className={styles.recipeMeta}>
          {recipe.healthScore && (
            <span className={styles.healthScore}>Health: {recipe.healthScore}%</span>
          )}
          {recipe.servings && (
            <span className={styles.servings}>Serves: {recipe.servings}</span>
          )}
        </div>
        <div className={styles.diets}>
          {recipe.diets?.slice(0, 3).map(diet => (
            <span key={diet} className={styles.dietTag}>
              {diet}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
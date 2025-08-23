import React from 'react';
import styles from './RecipeModal.module.css';

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{recipe.title}</h2>
          <img
            src={recipe.image}
            alt={recipe.title}
            className={styles.modalImage}
          />
        </div>

        <div className={styles.modalContent}>
          <div className={styles.recipeStats}>
            {recipe.readyInMinutes && (
              <div className={styles.stat}>
                <span className={styles.statIcon}>⏱</span>
                <span>{recipe.readyInMinutes} minutes</span>
              </div>
            )}
            {recipe.servings && (
              <div className={styles.stat}>
                <span className={styles.statIcon}>👥</span>
                <span>{recipe.servings} servings</span>
              </div>
            )}
            {recipe.healthScore && (
              <div className={styles.stat}>
                <span className={styles.statIcon}>❤️</span>
                <span>{recipe.healthScore}% health score</span>
              </div>
            )}
          </div>

          {recipe.summary && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>About this recipe</h3>
              <div 
                className={styles.summary} 
                dangerouslySetInnerHTML={{ __html: recipe.summary }} 
              />
            </div>
          )}

          {recipe.extendedIngredients && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Ingredients</h3>
              <ul className={styles.ingredientsList}>
                {recipe.extendedIngredients.map(ingredient => (
                  <li key={ingredient.id} className={styles.ingredient}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.analyzedInstructions && recipe.analyzedInstructions[0] && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Instructions</h3>
              <ol className={styles.instructionsList}>
                {recipe.analyzedInstructions[0].steps.map(step => (
                  <li key={step.number} className={styles.instructionStep}>
                    <span className={styles.stepNumber}>{step.number}.</span>
                    {step.step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {recipe.diets && recipe.diets.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Dietary Information</h3>
              <div className={styles.dietTags}>
                {recipe.diets.map(diet => (
                  <span key={diet} className={styles.dietTag}>
                    {diet}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
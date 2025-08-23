import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import Filters from './components/Filters/Filters';
import RecipeCard from './components/RecipeCard/RecipeCard';
import RecipeModal from './components/RecipeModal/RecipeModal';
import Favorites from './components/Favorites/Favorites';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { useRecipe } from './context/RecipeContext';
import styles from './App.module.css';

function RecipeList() {
  const { state } = useRecipe();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if (state.loading) {
    return <LoadingSpinner />;
  }

  if (state.error) {
    return <div className={styles.error}>Error: {state.error.message}</div>;
  }

  return (
    <>
      <div className={styles.recipeGrid}>
        {state.recipes.map(recipe => (
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
    </>
  );
}

function Home() {
  return (
    <div className={styles.app}>
      <SearchBar />
      <Filters />
      <RecipeList />
    </div>
  );
}

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className={styles.app}>
          <Header />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;
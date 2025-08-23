import axios from 'axios';

const API_BASE_URL = 'https://api.spoonacular.com/recipes';
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const searchRecipes = async (query, dietFilters = []) => {
  try {
    const params = {
      query: query,
      number: 20,
      addRecipeInformation: true,
      fillIngredients: true,
    };

    // Add diet filters if any are selected
    if (dietFilters.length > 0) {
      params.diet = dietFilters.join(',');
    }

    const response = await api.get('/complexSearch', { params });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    
    // Provide more specific error messages
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('Network Error: Please check your internet connection');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await api.get(`/${id}/information`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    
    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      throw new Error('Network Error: Please check your internet connection');
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};
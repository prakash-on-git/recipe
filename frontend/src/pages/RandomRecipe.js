import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header"
import './randomRecipe.css';

const RandomRecipe = () => {

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipe = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/recipe/get-random`);
            setRecipe(res.data);
            
        } catch (err) {
            setError("Recipe not found or server error.");
        } finally {
            setLoading(false);
        }
        
        };

        fetchRecipe();
    }, []); 

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!recipe) return <p className="text-center text-red-500">Recipe not found.</p>;

  return (
    <div>
      <Header />
      <div className="recipe-container">
        {/* Recipe Image */}
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />

        {/* Recipe Title */}
        <h2 className="recipe-title">{recipe.title}</h2>
        <p className="recipe-description">{recipe.description}</p>

        {/* Recipe Meta Info */}
        <div className="recipe-meta">
          <div>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
          </div>
          <div>
            <p><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
            <p><strong>Cook Time:</strong> {recipe.cookTime} mins</p>
            <p><strong>Total Time:</strong> {recipe.totalTime} mins</p>
          </div>
        </div>

        {/* Ingredients List */}
        <div className="recipe-section">
          <h3>Ingredients</h3>
          <ul className="recipe-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Steps List */}
        <div className="recipe-section">
          <h3>Instructions</h3>
          <ol className="recipe-list">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Back Button */}
        <Link to="/" className="back-link">Back to Recipes</Link>
      </div>
    </div>
    
  )
}

export default RandomRecipe

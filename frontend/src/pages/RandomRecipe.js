import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header"

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
      <Header/>
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Recipe Image */}
      <img src={recipe.image} alt={recipe.title} className="w-full h-60 object-cover rounded-md" />

      {/* Recipe Title */}
      <h2 className="text-3xl font-semibold mt-4">{recipe.title}</h2>
      <p className="text-gray-600 mt-2 text-xl">{recipe.description}</p>

      {/* Recipe Meta Info */}
      <div className="mt-4 text-gray-500 text-sm">
        <div className="flex justify-between">
            <p><strong>Category : </strong> {recipe.category}</p>
            <p><strong>Cuisine : </strong> {recipe.cuisine}</p>
            <p><strong>Servings : </strong> {recipe.servings}</p>
        </div>
        <div className="flex justify-between mt-2">
            <p><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
            <p><strong>Cook Time:</strong> {recipe.cookTime} mins</p>
            <p><strong>Total Time:</strong> {recipe.totalTime} mins</p>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Ingredients</h3>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Steps List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Instructions</h3>
        <ol className="list-decimal pl-5 mt-2 text-gray-700">
          {recipe.steps.map((step, index) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ol>
      </div>

      {/* Back Button */}
      <Link to="/" className="block mt-6 text-blue-500">Back to Recipes</Link>
    </div>
    </div>
    
  )
}

export default RandomRecipe

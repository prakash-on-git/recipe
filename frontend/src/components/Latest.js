import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import { Hourglass } from 'lucide-react';
import './latest.css';

const Latest = () => {

  const [popularRecipe, setPopularRecipe] = useState([]);

  useEffect( () => {
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }        

        const res = await axios.get("http://localhost:8080/recipe/get", {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
           },
        });
        setPopularRecipe(res.data.recipes);
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); // Call the async function

  }, [])

  return (
    <div className="new-section">
      <h2 className="new-title">New <Hourglass /></h2>
      <div className="recipes-container">
        {popularRecipe.length > 0 ? (
          popularRecipe.map((recipe) => (
            <Card  key={recipe._id}  id={recipe._id}  image={recipe.image}  recipeTitle={recipe.title} likes={recipe.likes.length}  prepTime={recipe.prepTime} cookTime={recipe.cookTime} />
            ))
        ) : (
          <p className="loading-text">Loading new recipes...</p>
        )}
        </div>
  </div>
  )
}

export default Latest

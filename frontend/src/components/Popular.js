import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import { ChartNoAxesCombined } from 'lucide-react';

const Popular = () => {

  const [popularRecipe, setPopularRecipe] = useState([]);

  useEffect( () => {
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }        

        const res = await axios.get("http://localhost:8080/recipe/get?sortBy=likes", {
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
    <div>
      <h2 className='text-4xl mb-12 font-thin flex items-center justify-center gap-4'>
        Popular
        <ChartNoAxesCombined/>
      </h2>
      <div className='flex gap-4 justify-center flex-wrap'>
          {popularRecipe.length > 0 ? (
          popularRecipe.map((recipe) => (
            <Card key={recipe._id} id={recipe._id} image={recipe.image} recipeTitle={recipe.title} likes={recipe.likes.length} prepTime={recipe.prepTime} cookTime={recipe.cookTime}/>
          ))
        ) : (
          <p>Loading popular recipes...</p>
        )}
      </div>
    </div>
  )
}

export default Popular

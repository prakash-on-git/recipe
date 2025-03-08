import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import { Hourglass } from 'lucide-react';

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
    <div>
      <h2 className='text-4xl my-20 font-thin flex items-center justify-center gap-4'>
        New
        <Hourglass/>
      </h2>
      <div className='flex gap-4 justify-center flex-wrap'>
          {popularRecipe.length > 0 ? (
          popularRecipe.map((recipe) => (
            <Card key={recipe._id} id={recipe._id} image={recipe.image} recipeTitle={recipe.title} likes={recipe.likes.length} prepTime={recipe.prepTime} cookTime={recipe.cookTime}/>
          ))
        ) : (
          <p>Loading new recipes...</p>
        )}
      </div>
    </div>
  )
}

export default Latest

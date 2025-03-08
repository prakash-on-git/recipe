import React from 'react'
import { Clock4, CookingPot, ThumbsUp } from "lucide-react"

const Card = ({id, image, recipeTitle, likes, prepTime, cookTime}) => {
  return (
    <div className='min-w-80 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg' onClick={() => window.location.href=`/recipe/${id}`}>
        <img src={image} alt={recipeTitle || "Recipe title"} className='rounded-t-lg h-4/5 w-[100%] object-cover object-center bg-slate-700'/>
        <div className='py-2 px-4'>
            <div className='flex justify-between items-center'>
                <p className='text-gray-500 flex items-center gap-2'><Clock4/> {prepTime}</p>
                <p className='text-gray-500 flex items-center gap-2'><CookingPot/> {cookTime}</p>
                <p className='text-gray-500 flex items-center gap-2'><ThumbsUp/> {likes}</p>
            </div>
            <h2 className='text-xl font-normal mb-2'>{recipeTitle}</h2>
        </div>
    </div>
  )
}

export default Card

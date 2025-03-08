import React from 'react'
import { Clock4, CookingPot, ThumbsUp } from "lucide-react"
import './card.css'

const Card = ({id, image, recipeTitle, likes, prepTime, cookTime}) => {
  return (
    <div className="card-container" onClick={() => (window.location.href = `/recipe/${id}`)}>
      <img src={image} alt={recipeTitle || "Recipe title"} className="card-image"/>
      <div className="card-content">
        <div className="card-meta">
          <p><Clock4 /> {prepTime}</p>
          <p><CookingPot /> {cookTime}</p>
          <p><ThumbsUp /> {likes}</p>
        </div>
        <h2 className="card-title">{recipeTitle}</h2>
      </div>
    </div>
  )
}

export default Card

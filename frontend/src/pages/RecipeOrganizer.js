import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import Header from "../components/Header";
import './recipeOrganizer.css';

const ItemType = "RECIPE";

const DraggableRecipe = ({ recipe, index, moveRecipe }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { id: recipe._id, index, category: recipe.category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), 
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index || draggedItem.category !== recipe.category) {
        moveRecipe(draggedItem, recipe.category, index);
        draggedItem.index = index;   
        draggedItem.category = recipe.category;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className={`p-2 bg-white dark:bg-gray-700 shadow-md rounded-lg my-2 cursor-pointer capitalize ${isDragging ? "opacity-50" : "opacity-100"}`}>
      {recipe.title}
    </div>
  );
};

const RecipeOrganizer = () => {
  const token = localStorage.getItem("token");
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/recipe/categories",{ 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => setCategories(res.data));
  }, [token]);

  const moveRecipe = (draggedItem, newCategory, newIndex) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category) => {
        let newRecipes = [...category.recipes];

        if (category.category === draggedItem.category) {
          newRecipes = newRecipes.filter((r) => r._id !== draggedItem.id);
        }

        if (category.category === newCategory) {
          newRecipes.splice(newIndex, 0, { ...draggedItem, category: newCategory,});
        }

        return { ...category, recipes: newRecipes };
      });

      return updatedCategories;
    });
  };

  const saveChanges = () => {
    const updatedRecipes = categories.flatMap((category) =>
      category.recipes.map((recipe, index) => ({
        _id: recipe._id,
        category: category.category,
        position: index,
      }))
    );

    axios.put("http://localhost:8080/recipe/update-order", { updatedRecipes }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(() => alert("Changes saved!"));
  };

  return (
    <div>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <div className="organizer-container">
          <h2 className="organizer-title">Drag & Drop Recipe Organizer</h2>
          <div className="recipe-grid">
            {categories.map((category) => (
              <div key={category.category} className="recipe-category">
                <h3 className="category-title">{category.category}</h3>
                {category.recipes.length > 0 ? (
                  category.recipes.map((recipe, index) => (
                    <DraggableRecipe key={recipe._id} recipe={recipe} index={index} category={category.category} moveRecipe={moveRecipe}/>
                  ))
                ) : (
                  <p className="no-recipe">No recipes yet</p>
                )}
              </div>
            ))}
          </div>
          <div className="save-button-container">
            <button onClick={saveChanges} className="save-button">
              Save Changes
            </button>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default RecipeOrganizer;

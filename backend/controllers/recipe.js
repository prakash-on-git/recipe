const Recipe = require("../models/Recipe");

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, prepTime, cookTime, servings, category, cuisine, image } = req.body;

    // Validate required fields
    if (!title || !description || !ingredients.length || !steps.length || !prepTime || !cookTime || !servings || !category) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const totalTime = prepTime + cookTime;

    // Create new recipe
    const newRecipe = new Recipe({ title, description, ingredients, steps, prepTime, cookTime, totalTime, servings, category, cuisine, image, author: req.user.id});

    await newRecipe.save();

    res.status(201).json({ message: "Recipe created successfully!", recipe: newRecipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get a single recipe by ID
const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the recipe by ID and populate author details
    const recipe = await Recipe.findById(id).populate("author", "username email");

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get all recipes with optional filtering and pagination
const getRecipes = async (req, res) => {
  try {
    const { category, cuisine, page = 1, limit = 10, search } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (cuisine) filter.cuisine = cuisine;
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    const recipes = await Recipe.find(filter)
      .populate("author", "username email") // Populate author details
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalRecipes = await Recipe.countDocuments(filter);

    res.status(200).json({ totalRecipes, currentPage: parseInt(page), totalPages: Math.ceil(totalRecipes / limit), recipes,});

  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Update a recipe by ID
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user.id; // Assuming authMiddleware adds `req.user.id`

    // Find the recipe
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the logged-in user is the author of the recipe
    if (recipe.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this recipe" });
    }

    // Update the recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, { new: true });

    res.status(200).json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Assuming authMiddleware adds `req.user.id`

    // Find the recipe
    const recipe = await Recipe.findById(id);

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Check if the logged-in user is the author of the recipe
    if (recipe.author.toString() !== userId) return res.status(403).json({ message: "Unauthorized to delete this recipe" });

    // Delete the recipe
    await Recipe.findByIdAndDelete(id);

    res.status(200).json({ message: "Recipe deleted successfully" });

  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { createRecipe, getRecipe, getRecipes, updateRecipe, deleteRecipe };

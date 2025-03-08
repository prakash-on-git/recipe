const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }], 
  steps: [{ type: String, required: true }], 
  prepTime: { type: Number, required: true }, // in minutes
  cookTime: { type: Number, required: true }, // in minutes
  totalTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., "Dessert", "Main Course"
  cuisine: { type: String }, // e.g., "Italian", "Indian"
  image: { type: String }, // URL for the recipe image
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },

  position: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("Recipe", recipeSchema);

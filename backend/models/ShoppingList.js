const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      ingredient: { type: String, required: true },
      quantity: { type: String }, // e.g., "2 cups"
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ShoppingList", shoppingListSchema);

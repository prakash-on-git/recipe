const router = require('express').Router();
const { createRecipe, getRecipe, getRecipes, updateRecipe, deleteRecipe, getRandomRecipe, getCategoriesWithRecipes, updateRecipeOrder } = require('../controllers/recipe');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, createRecipe);
router.get('/get/:id', getRecipe);
router.get('/get', getRecipes);
router.get('/get-random', getRandomRecipe);
router.put('/update/:id', authMiddleware, updateRecipe);
// router.delete('/delete/:id', authMiddleware, deleteRecipe);

router.get("/categories", authMiddleware, getCategoriesWithRecipes);
router.put("/update-order", authMiddleware, updateRecipeOrder);

module.exports = router;

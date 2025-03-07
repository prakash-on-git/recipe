const router = require('express').Router();
const { createRecipe, getRecipe, getRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipe');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, createRecipe);
router.get('/get/:id', authMiddleware, getRecipe);
router.get('/get', authMiddleware, getRecipes);
router.put('/update/:id', authMiddleware, updateRecipe);
router.delete('/delete/:id', authMiddleware, deleteRecipe);

module.exports = router;

const express = require('express');
const recipes = require('../data/recipes');

const router = express.Router();

// GET all recipes
router.get('/', (req, res) => {
  res.json(recipes);
});

// GET a specific recipe by ID
router.get('/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ message: 'Cannot find recipe' });
  res.json(recipe);
});

// POST (Create) a new recipe
router.post('/', (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  if (!title || !description || !ingredients || !instructions) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newRecipe = {
    id: recipes.length + 1,
    title,
    description,
    ingredients,
    instructions,
  };
  recipes.push(newRecipe);
  res.json(newRecipe);
});

// PUT (Update) a recipe
router.put('/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

  const { title, description, ingredients, instructions } = req.body;
  if (title) recipe.title = title;
  if (description) recipe.description = description;
  if (ingredients) recipe.ingredients = ingredients;
  if (instructions) recipe.instructions = instructions;

  res.json(recipe);
});

// DELETE a recipe
router.delete('/:id', (req, res) => {
  const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Recipe not found' });

  recipes.splice(index, 1);
  res.send();
});

module.exports = router;

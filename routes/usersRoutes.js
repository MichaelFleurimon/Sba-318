const express = require('express');
const users = require('../data/users'); 

const router = express.Router();

// Helper function to find a user by ID
const findUserById = (id) => users.find(u => u.user_id === parseInt(id));

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET a specific user by ID
router.get('/:id', (req, res) => {
  const user = findUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST (Create) a new user
router.post('/', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const newUser = {
    user_id: users.length + 1, // Auto-generate user_id
    username,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (Update) a user
router.put('/:id', (req, res) => {
  const user = findUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const  username  = req.body;
  if (username) user.username = username; // Update username if provided

  res.json(user);
});

// DELETE a user
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.user_id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(index, 1); // Remove the user from the array
  res.status(204).send(); // No content to send back
});

module.exports = router;
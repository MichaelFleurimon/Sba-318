const express = require('express');
const comments = require('../data/comments'); // Import the comments data

const router = express.Router();

// Helper function to find a comment by ID
const findCommentById = (id) => comments.find(c => c.comment_id === parseInt(id));

// GET all comments
router.get('/', (req, res) => {
  res.json(comments);
});

// GET a specific comment by ID
router.get('/:id', (req, res) => {
  const comment = findCommentById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  res.json(comment);
});

// POST (Create) a new comment
router.post('/', (req, res) => {
  const { recipe_id, user_id, text } = req.body;
  if (!recipe_id || !user_id || !text) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newComment = {
    comment_id: comments.length + 1, 
    recipe_id,
    user_id,
    text,
  };

  comments.push(newComment);
  res.json(newComment);
});

// PUT (Update) a comment
router.put('/:id', (req, res) => {
  const comment = findCommentById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  const { text } = req.body;
  if (text) comment.text = text; // Update text if provided

  res.json(comment);
});

// DELETE a comment
router.delete('/:id', (req, res) => {
  const index = comments.findIndex(c => c.comment_id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Comment not found' });

  comments.splice(index, 1); // Remove the comment from the array
  res.send(); 
});

module.exports = router;
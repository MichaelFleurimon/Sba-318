const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const recipesRoutes = require('./routes/recipesRoutes');
const commentsRoutes = require('./routes/commentRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
app.use(bodyParser.json());

// Register routes
app.use('/recipes', recipesRoutes);
app.use('/comments', commentsRoutes);
 app.use('/users', usersRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'No clue where that is' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

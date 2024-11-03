const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app's dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client-side routing by redirecting all requests to `index.html`
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server on the Heroku-assigned port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

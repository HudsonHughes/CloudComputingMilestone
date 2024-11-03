import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// ES module-specific code to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

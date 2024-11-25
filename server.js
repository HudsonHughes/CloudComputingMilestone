// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// ES module-specific code to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log server initialization
console.log("Initializing server...");

// Serve static files from the React app's dist directory
const staticPath = path.join(__dirname, "dist");
console.log(`Serving static files from: ${staticPath}`);
app.use(express.static(staticPath));

// Handle client-side routing by redirecting all requests to `index.html`
app.get("/*", (req, res) => {
  console.log(`Handling request for: ${req.url}`);
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting test server...');

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'Test server is running', timestamp: new Date().toISOString() });
});

// Serve static files from client/dist
const clientDistPath = path.join(__dirname, '../client/dist');
console.log('Client dist path:', clientDistPath);
console.log('Client dist exists:', fs.existsSync(clientDistPath));

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Test server is running - Frontend build not found');
  });
}

// Start server
const PORT = 3001;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
}); 
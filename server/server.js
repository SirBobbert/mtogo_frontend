const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Enable CORS
app.use(cors());

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

// Define your API routes below
app.get('/api/restaurants/all', async (req, res) => {
  try {
    const response = await fetch('http://localhost:8082/restaurants/all');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Redirect other routes to the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

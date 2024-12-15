const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

// Server port
const port = 8081;

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// API endpoint
app.post('/analyze', async (req, res) => {
  const url = req.body.url;

  // Check if URL is provided
  if (!url) {
    return res.status(400).send('URL is required');
  }

  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${encodeURIComponent(url)}&lang=en`;

  try {
    const response = await fetch(apiUrl);
    
    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Error fetching the API:", error);
    res.status(500).send("Internal Server Error");
  }
});

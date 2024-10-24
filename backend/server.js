const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/photo-organizer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const uploadRoute = require('./routes/upload');

app.use('/api', uploadRoute);


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

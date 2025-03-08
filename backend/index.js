const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
const featureFlagMiddleware = require('./middleware/featureFlag');

require("dotenv").config();
require('./models/db');

const PORT = process.env.SERVERPORT || 8080;

// Custom Middleware to Log Requests
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// Middleware -> to log data 
app.use(requestLogger);

// Apply Feature Flag Middleware
app.use(featureFlagMiddleware);

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from frontend
  credentials: true, // Allow cookies to be sent with requests
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow custom headers
}));

app.use('/auth',authRoutes);
app.use('/recipe',recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;


// npm start
// npm test

// {
//   "username": "Prakash",
//   "email": "test@gmail.com",
//   "password": "testtest"
// }

// "message": "Login successful",
// "success": true,
// "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiI2N2M5ZWE5ZmNkNmQ5NjMzZDIwZWYxZWMiLCJpYXQiOjE3NDEzMTk4NDEsImV4cCI6MTc0MTM2MzA0MX0.hu4Wc_POBUA156SRoRmIrXU6f2nVNgemNxjS0VCUVa8",
// "email": "test@gmail.com",
// "username": "Prakash"

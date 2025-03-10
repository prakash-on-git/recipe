const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
const featureFlagMiddleware = require('./middleware/featureFlag');
require('./models/db');

require("dotenv").config();
const app = express();
const PORT = process.env.SERVERPORT || 8080;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
}));

app.options("*", cors());

// ✅ Custom Middleware to Log Requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Apply Feature Flag Middleware
app.use(featureFlagMiddleware);

app.get('/ping', (req, res) => { res.send('Pong!'); });

app.use(bodyParser.json());

app.use('/auth',authRoutes);
app.use('/recipe',recipeRoutes);

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`);});

module.exports = app;

// npm start
// npm test
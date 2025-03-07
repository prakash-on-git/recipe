const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');

require("dotenv").config();
require('./models/db');

const PORT = process.env.SERVERPORT || 8080;

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',authRoutes);
app.use('/recipe',recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


// npm start

// {
//   "username": "Prakash",
//   "email": "test@gmail.com",
//   "password": "testtest"
// }


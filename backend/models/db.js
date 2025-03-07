const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url = process.env.MONGO_DB_CONNECTION;

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.log('Error connecting to MongoDB', err);}
);

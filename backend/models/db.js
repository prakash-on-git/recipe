const mongoose = require('mongoose');
require('dotenv').config();

const mongo_url = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URI : process.env.MONGO_DB_CONNECTION;

mongoose.connect(mongo_url)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.log('Error connecting to MongoDB', err);}
);

// NODE_ENV=test npm test
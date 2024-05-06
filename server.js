const express = require('express');
//Import Database
const db = require('./config/connection');
//Import Routes
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(routes);


//What to do once Database is Created
db.once('open', () => {
app.listen(PORT, () => {
console.log(`SocialNetwork API server running on ${PORT}!`);
});
});
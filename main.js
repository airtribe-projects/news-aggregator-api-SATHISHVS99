const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const validator = require('validator');
const usercontroller = require('./controller/usercontroller');
const app = express();
app.use(express.json()); 
const port = 3000;
const url = 'mongodb://localhost:27017/newsapi';

mongoose.connect(url).then(() => console.log ("DB connected successfully"));

//POST-USER SIGNUP
app.route('/api/v1/register').post(usercontroller.signup);

//POST-USER LOGIN
app.route('/api/v1/login').post(usercontroller.login);

//GET LOGGED-IN USER PREFERENCES
app.route('/api/v1/preferences').get(usercontroller.protect, usercontroller.getpreference).put(usercontroller.protect, usercontroller.putpreferences);

//GET NEWS API FOR LOGGED IN USER
app.route('/api/v1/news').get(usercontroller.protect, usercontroller.getnews);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});
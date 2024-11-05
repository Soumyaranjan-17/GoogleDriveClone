// app.js
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv').config();
const connectToDB = require('./config/db')();
// connectToDB();
const cookieParser = require('cookie-parser');


const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Use userRouter for handling user routes
app.use('/user', userRouter);

// Start the server
const PORT = 3000;
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

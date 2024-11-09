// app.js

// Import required modules
const express = require('express'); // Core framework for creating the server
const morgan = require('morgan'); // Middleware for logging HTTP requests
const userRouter = require('./routes/user.routes'); // Router module for user-related routes
const indexRouter = require('./routes/index.routes'); // Router module for index or home page routes
require('dotenv').config(); // Loads environment variables from a .env file
require('./config/db')(); // Imports and immediately invokes the database connection function
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies

// Initialize the express app
const app = express();

// Basic middleware setup
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 
app.use(cookieParser()); 


// Set EJS as the templating engine
app.set('view engine', 'ejs'); // Tells Express to use EJS as the default template engine for rendering views

// Define routes
app.get('/', (req, res) => {
    res.render('index'); // Renders the `index.ejs` template located in the `views` directory
});

app.use('/', indexRouter); // Gives the `indexRouter` priority, handling any root URL (`/`) requests

app.use('/user', userRouter); // Handles routes prefixed with `/user` (e.g., `/user/login`)


// Start the server
const PORT = 3000; // Sets the server port
app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


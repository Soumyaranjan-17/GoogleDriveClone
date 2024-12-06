const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home'); // Renders the `index.ejs` template located in the `views` directory
});
router.get('/home', (req, res) => {
    res.render('home'); // Renders the `index.ejs` template located in the `views` directory
});
router.get('/upload', (req, res) => {
    res.render('upload');
})



module.exports = router;
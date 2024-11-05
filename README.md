npm init -y
npm i express ejs

app.js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
res.send("Hello World!")
})

app.listen(3000, ()=>{
console.log("Server Engine Started");
})

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "npx nodemon app.js"
  },

on terminal 
npm start


// Setup empty JS object to act as endpoint for all routes
projectData = [];

const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
// Require Express to run server and routes
const express = require('express');
const app = require('./app')


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('dist'));

console.log(__dirname)
// GET HTTP
app.get("/", (req, res) => {
    res.sendFile('dist/index.html')
    // res.end();
});

// Setup Server
const port = 3000;
const server = app.listen(port, listining);

function listining() {
    console.log(`server is conectting with localhost:${port}`);
}


const keys = {
    GeoKey    : `${process.env.GeoKey}`,
    WitherKey : `${process.env.WitherKey}`,
    PixaPay   :`${process.env.PixaPay}`
}

app.post("/Keys", (req, res) => {    
    res.send(keys);
})
// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000
// Require Express to run server and routes
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
    console.log(`hello i am running on port ${port}`);
})

// GET route that returns the projectData object to app
app.get("/allOfData",function(req,res){
    res.send(projectData);
});

//POST route that adds incoming data to projectData
app.post( '/add' , function (req,res){
    newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
    }
    projectData = newEntry;
    res.send(projectData);
    
});



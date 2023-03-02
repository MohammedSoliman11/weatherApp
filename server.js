//PORT NUMBER
const port = 8000;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

app.listen(port,()=>{console.log('server is runing on port '+port);});

app.get('/GetData',(req,res)=>{
    res.send(projectData);
});

app.post('/PostData',(req,res)=>{
    projectData = {
        temp : req.body.temp,
        date : req.body.date,
        userResponse:req.body.userResponse,
    }
    res.status(200).end();
});
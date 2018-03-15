// Require the Express Module
var express = require('express');

// Require the Mongoose Module
var mongoose = require('mongoose');

// Create an Express App
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

// Integrate body-parser with our App
app.use(bodyParser.json());

// Require path
var path = require('path');

// Setting our Static Folder Directory
//app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/angularApp/dist' ));

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

mongoose.connect('mongodb://localhost/ninja_gold');

// define Schema variable
var Schema = mongoose.Schema;

var TaskSchema = new mongoose.Schema({
    title:  { type: String, required: [true, "Title is required"], minlength: [3, "Title must be at least 3 characters long"] },
    description: { type: String, default: "" },
    completed: { type: Boolean, default: false }
}, {timestamps: true });

// set our models by passing them their respective Schemas
// mongoose.model('Task', TaskSchema);

// store our models in variables
var Task = mongoose.model('Task', TaskSchema);

// Routes
// Root Request
app.get('/tasks', function(req, res) {
    Task.find({ }, function(err, tasks) {         
        if(err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err});
        }else{
            // respond` with JSON
            res.json({message: "Success", data: tasks});
        }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
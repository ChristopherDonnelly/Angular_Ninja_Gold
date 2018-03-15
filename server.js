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

var NinjaSchema = new mongoose.Schema({
    name: { type: String, required: [true]},
    total:  { type: Number, required: [true], default: 0 }
}, {timestamps: true });

// set our models by passing them their respective Schemas
// mongoose.model('Task', TaskSchema);

// store our models in variables
var Ninja = mongoose.model('Ninja', NinjaSchema);

// Routes
// Root Request
app.get('/', function(req, res) {
    Ninja.find({ }, function(err, ninjas) {         
        if(err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err});
        }else{
            // respond` with JSON
            res.json({message: "Success", data: ninjas});
        }
    });
});

// find & login OR create new ninja
app.post('/ninja', function(req, res){
    console.log("POST DATA", req.body, "inside create ninja route")
    // check w/name if ninja already exists in db
    Ninja.findOne({name: req.body.name}, function(err, ninja){
        if (err) {
            res.json({message: "Error @ create ninja", error: err });
        }
        // if ninja not in db, create ninja
        else if (!ninja) {
            Ninja.create({name: req.body.name}, function(err, ninja){
                if (err){
                    res.json({message: "Error while creating ninja", error: err })
                }
                else {
                    res.json({message: "Successfully created ninja", ninja: ninja});
                }
            });
        }
        // else, ninja already exists => don't create
        else {
            res.json({message: "Successfully found ninja", ninja: ninja});
        }
    });
});

app.get('/farm/:id', function(req, res){
    Ninja.findOne({_id: req.params.id}, function(err, ninja){
        // retrieve 1 Ninja Object (document) from DB
        if (err) {
            res.json({message: "Error finding ninja at farm", error: err});
        }
        else {
            // earn 2 - 5 gold  - INCLUSIVE (Math.random() * (max - min + 1) + min)
            ninja.total += Math.floor(Math.random() * (5 - 2 + 1) + 2);
            res.json({message: "Ninja successfully farmed!", ninja: ninja})
        }
    });
});
app.get('/cave/:id', function(req, res){
    Ninja.findOne({_id: req.params.id}, function(err, ninja){
        if (err) {
            res.json({message: "Error finding ninja at farm", error: err});
        }
        else {
            // earn 5 - 10 gold 
            ninja.total += Math.floor(Math.random() * (10 - 5 + 1) + 5);
            res.json({message: "Ninja successfully found cave!", ninja: ninja})
        }
    });
});
app.get('/house/:id', function(req, res){
    Ninja.findOne({_id: req.params.id}, function(err, ninja){
        if (err) {
            res.json({message: "Error finding ninja at farm", error: err});
        }
        else {
            // earn 7 - 15 gold 
            ninja.total += Math.floor(Math.random() * (15 - 7 + 1) + 7);
            res.json({message: "Ninja successfully found house!", ninja: ninja})
        }
    });
});
app.get('/casino/:id', function(req, res){
    Ninja.findOne({_id: req.params.id}, function(err, ninja){
        if (err) {
            res.json({message: "Error finding ninja at farm", error: err});
        }
        else {
            // earn  or lose up to 100 gold
            let coin_flip = (Math.floor(Math.random() * 1) + 1);
            // coin flip betwee 0 & 1
            if (coin_flip === 0 ){
                // LOSE up to 100 gold
                ninja.total += (Math.floor(Math.random() * 100 + 1));
            }
            else {
                // EARN up to 100 gold
                ninja.total += (Math.floor(Math.random() * 100 + 1));
            }
            res.json({message: "Successfully found ninja at farm!", ninja: ninja})
        }
    });
});


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
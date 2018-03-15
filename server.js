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
            let wages = Math.floor(Math.random() * (5 - 2 + 1) + 2);
            ninja.total += wages;
            ninja.save();
            res.json({message: `${ninja.name} earned ${wages} while working on the Farm.`, ninja: ninja})
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
            let treasures = Math.floor(Math.random() * (10 - 5 + 1) + 5);
            ninja.total += treasures;
            ninja.save();
            res.json({message: `${ninja.name} earned ${treasures} while exploring the Cave.`, ninja: ninja})
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
            let wages = Math.floor(Math.random() * (15 - 7 + 1) + 7);
            ninja.total += wages;
            ninja.save();
            res.json({message: `${ninja.name} earned ${wages} while crafting at your House.`, ninja: ninja})
        }
    });
});

app.get('/casino/:id', function(req, res){
    Ninja.findOne({_id: req.params.id}, function(err, ninja){
        if (err) {
            res.json({message: "Error finding ninja at casino", error: err});
        }
        else {
            let winnings = (Math.floor(Math.random() * 100 + 1));
            let earnedLost = 'earned';
            // earn or lose up to 100 gold
            let coin_flip = (Math.floor(Math.random() * 2));
            // coin flip between 0 & 1
            if (coin_flip === 0){
                // LOSE up to 100 gold
                earnedLost = 'lost';
                ninja.total -= winnings;
                winnings *= -1;
            }
            else {
                // EARN up to 100 gold
                ninja.total += winnings;
            }
            ninja.save();
            res.json({message: `${ninja.name} ${earnedLost} ${winnings} while gambling at the Casino!`, ninja: ninja})
        }
    });
});


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
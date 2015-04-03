var express = require('express');
var mongoose = require('mongoose');
var Beer = require('./models/beer');

mongoose.connect('mongodb://localhost/beerlocker', function (err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'You are running dangerously low on beer!' });
});

app.use('/api', router);

app.listen(port);
console.log('Insert beer on port ' + port);

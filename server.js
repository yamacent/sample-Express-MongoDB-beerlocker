var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

mongoose.connect('mongodb://localhost/beerlocker', function (err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'You are running dangerously low on beer!' });
});

var beersRoute = router.route('/beers');

beersRoute.post(function (req, res) {
    var beer = new Beer();

    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;

    beer.save(function (err) {
        if (err) { res.send(err); }
        res.json({ message: 'Beer added to the locker!', data: beer });
    });
});

beersRoute.get(function (req, res) {
    Beer.find(function (err, beers) {
        if (err) { res.send(err); }
        res.json(beers);
    });
});

var beerRoute = router.route('/beers/:beer_id');

beerRoute.get(function (req, res) {
    Beer.findById(req.params.beer_id, function (err, beer) {
        if (err) { res.send(err); }
        res.json(beer);
    });
});

app.use('/api', router);

app.listen(port);
console.log('Insert beer on port ' + port);

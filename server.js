var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');

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

var router = express.Router();

router.route('/beers')
    .post(beerController.postBeers)
    .get(beerController.getBeers);

router.route('/beers/:beer_id')
    .get(beerController.getBeer)
    .put(beerController.putBeer)
    .delete(beerController.deleteBeer);

app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Insert beer on port ' + port);

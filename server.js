var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');

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

app.use(passport.initialize());

var router = express.Router();

router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Insert beer on port ' + port);

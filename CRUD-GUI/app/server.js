
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Bear       = require('./models/bear');
var router = express.Router();
var mongoose   = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/expressAPI');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

// middle
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'my first Express API' });
});

router.route('/bears')

.post(function(req, res) {
  console.log(req.body)
  var bear = new Bear();
  console.log(bear);
  bear.name = req.body.name;
  console.log(bear);
  bear.save(function(err) {
    if (err) res.send(err);
    res.json({ message: 'Bear created!' });
  });
})

.get(function(req, res) {
  Bear.find(function(err, bears) {
    if (err) res.send(err);
    res.json(bears);
  });
})

.delete(function(req, res) {

  Bear.remove({
    _id: req.body.bear_id
  }, function(err, bear) {
    if (err)
    res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
});

router.route('/bears/:bear_id')
.get(function(req, res) {
  Bear.findById(req.params.bear_id, function(err, bear) {
    if (err) res.send(err);
    res.json(bear);
  });
});

app.use('/api', router);

app.listen(port);
console.log('meet me at port: ' + port);

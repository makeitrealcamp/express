var express = require('express');
var router = express.Router();

function isUpperCase(str) {
    return str === str.toUpperCase();
}

/* GET users listing. */
router.post('/', function(req, res, next) {

  var grandma = req.body.userInput;
  if(grandma){
    switch (isUpperCase(grandma)) {
      case true:
          grandma = 'DO\'\nNT YELL!!!' + grandma;
      break;
      case false:
          grandma = 'speak louder!' + grandma;
      break;
    }
  }
  res.render('index', { grandma: grandma});

});

module.exports = router;


;

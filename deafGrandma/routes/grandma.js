var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.post('/', function(req, res, next) {
  res.send(`Implementa esta ruta tu mismo <br /> Params: ${JSON.stringify(req.body)}`);
});
*/
router.post('/', function(req, res) {
  var userInput = req.body.userInput
  var grandmaSays = "Mijo, cierre la ventana que se sale el wifi!"
  var grandmaYells = "¡Hable más duro!"
  if(isUpperCase(userInput)){
	  	res.render('index',{
	    grandma: grandmaSays,
	  })
  }else {
  	res.render('index',{
	    grandma: grandmaYells,
	  })
  	}
})


function isUpperCase(str) { 
  return (str == str.toUpperCase()); 
}

module.exports = router;

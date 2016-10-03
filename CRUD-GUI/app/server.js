express = require('express')
var app = express()
var port = 3000

app.get('/', function (req, res) {
  res.send('server test')
})

app.listen(port, function () {
  console.log(`listening ${port}`)
})

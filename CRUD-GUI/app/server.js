var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var Student       = require('./models/student')
var router = express.Router()
var mongoose   = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/expressAPI')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var port = process.env.PORT || 8080

// middle
// router.use(function(req, res, next) {
//   console.log('Something is happening.')
//   next()
// })

router.get('/', function(req, res) {
  res.json({ message: 'my first Express API' })
})

router.route('/students')

.get(function(req, res) {
  Student.find(function(err, students) {
    if (err) res.send(err)
    res.json(students)
  })
})

.post(function(req, res) {
  var student = new Student()
  student.name = req.body.name
  student.save(function(err) {
    if (err) res.send(err)
    res.json({ student })
  })
})

router.route('/students/:student_id')
.get(function(req, res) {
  Student.findById(req.params.student_id, function(err, student) {
    if (err) res.send(err)
    res.json( student )
  })
})

.patch(function(req, res) {
  Student.findById(req.params.student_id, function(err, student){
      student.name = req.body.name
      student.save(function(err){
        if (err) res.send(err)
         res.json( student )
      })
  })
})

.delete(function(req, res) {
  var tempStudent = Student.findById(req.params.student_id, function(err, tempStudent) {
    if (err) res.send(err)
    Student.remove({ _id: req.params.student_id }, function(err, student) {
      if (err)res.send(err)
      res.json( tempStudent )
    })
  })

})

app.use('/api', router)
app.listen(port)
console.log('meet me at port: ' + port)

var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var Student    = require('./models/student')
var User       = require('./models/user')
var router     = express.Router()
var mongoose   = require('mongoose')
var bcrypt       = require('bcrypt')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/expressAPI')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var port = process.env.PORT || 8080

function checkPassword( userName, password ){
  var valid = false
  User.findOne({ 'username': userName }, function (err, user) {
    if (err) return err
    bcrypt.compare(password,  user.password, function(err, res) {
      valid = res
    })
  })
  return valid
}

// middle
router.use(function(req, res, next) {

  if (req.headers.username && req.headers.password){
    next()
  } else {
    return res.status(500).send({ success: false, message: 'username or password missing on headers.' })
  }

})

router.use(function(req, res, next) {
  var rus = res
  User.findOne({ 'username': req.headers.username }, function (err, user) {
    if (err) return err
    bcrypt.compare(req.headers.password,  user.password, function(err, res) {
      if (res){
        next()
      }else {
        return rus.status(500).send({ success: false, message: 'Authentication failed.' })
      }
    })
  })

})

router.route('/users')
.get(function(req, res) {
  User.find(function(err, users) {
    if (err) res.send(err)
    res.json(users)
  })
})

.post(function(req, res) {
  var user = new User(req.body)
  user.save(function(err) {

    if (err) {
      if (err.code === 11000) {
        return res.status(500).send({ success: false, message: 'Username already in use, please use other.' })
      }

      return res.status(500).send(err);
    }

    res.json({ user })
  })
})

router.route('/students/:user_id')
.get(function(req, res) {
  User.findById(req.params.user_id, function(err, student) {
    if (err) res.send(err)
    res.json( user )
  })
})
.delete(function(req, res) {
  var tempUser = User.findById(req.params.user_id, function(err, tempUser) {
    if (err) res.send(err)
    User.remove({ _id: req.params.user_id }, function(err, user) {
      if (err)res.send(err)
      res.json( tempUser )
    })
  })

})

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

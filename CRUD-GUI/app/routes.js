  app.get('/login', function(req, res){
    res.render('login', { title: 'Express Login' });
  });

  router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
  });

  router.get('/', function(req, res) {
    res.json({ message: 'my first Express API' });
  });

  router.route('/students')

  .post(function(req, res) {
    var student = new Student(req.body);
    // student.name = req.body.name;
    student.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'Student created!' });
    });
  })

  .get(function(req, res) {
    Student.find(function(err, students) {
      if (err) res.send(err);
      res.json(students);
    });
  });

  router.route('/students/:student_id')
  .get(function(req, res) {
    Student.findById(req.params.student_id, function(err, student) {
      if (err) res.send(err);
      res.json(student);
    });
  });

  app.use('/api', router);

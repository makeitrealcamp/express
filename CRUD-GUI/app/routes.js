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

  router.route('/bears')

  .post(function(req, res) {
    var bear = new Bear(req.body);
    // bear.name = req.body.name;
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
  });

  router.route('/bears/:bear_id')
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);
      res.json(bear);
    });
  });

  app.use('/api', router);

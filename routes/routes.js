var user = require('../model/userSchema');

module.exports = function(app){



  app.get('/', function(req, res){
      res.render('../public/home.ejs');
  })

app.get('/carousel', function(req, res){
  res.render('../public/carousel.ejs')
})

  app.get('/users', function(req, res){
    user.find({}, function(err, found){
       res.render('../public/user.ejs', {users: found});
    })
  })

  app.get('/users/update/:username', function(req, res){
    user.findOne({username: req.params.username}, function(err, found){
       res.render('../public/update.ejs', {user: found, message: req.query.message});
    })
  })

  app.post('/users/update/:username', function(req, res){
    if (req.body.password == req.body.confirm) {
      user.findOne({username: req.params.username}, function(err, user){
        user.username = req.body.username;
        user.password = req.body.password;
        user.name     = req.body.name;
        user.title    = req.body.title;
        user.save();
        console.log(user);
           res.redirect('/users');
      })
    }else {
      res.redirect('/users/update/'+ req.params.username + '?message=passwords dont match')
    }
  });

app.get('/users/delete/:username', function(req, res){
  user.findOne({username: req.params.username}, function(err, user){
    user.remove();
    res.redirect('/users');
  })
})

  app.get('/signup', function(req, res){
    res.render('../public/signup.ejs' , { message : req.query.message});
  })

  app.post('/signup', function(req, res){
    if(req.body.name.toLowerCase() == 'dan'){
      user.create({
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          title: req.body.title,
      });
      res.redirect('https://www.youtube.com/watch?v=1XZGHOxnCto')
    }

    if(req.body.password == req.body.confirm){
      user.create({
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          title: req.body.title,
      });
      res.redirect('/users');

    }else{
      res.redirect('/signup' + '?message=passwords dont match');
    }

  })


  /* This has to be at the end to not overwrite */
  app.get('*', function(req,res){
    res.send('404');
  })

}

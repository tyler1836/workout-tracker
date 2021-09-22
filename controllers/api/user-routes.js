const User = require('../../models/User');
// const Post = require('../../models/Post');
const router = require('express').Router();
// const { User, Post } = require('sequelize')
const bcrypt = require('bcrypt');

const loggedIn =(req, res, next) => {
  console.log(req.session.loggedIn)
  if(req.session.loggedIn){
    next();
  }
  else{
    res.redirect('/login')
  }
}


router.get('/login', (req, res) => {
  res.render('loginpage')
});

router.get('/signup', (req, res) => {
  res.render('signuppage')
});

router.get('/dashboard', loggedIn, (req, res)=> {
  res.render('notespage')
});


router.post('/signup', async (req, res) => {

  const { username, email, password } = req.body;

  let user = await User.findOne({ 
    where: {email} 
  });
  console.log(user)
  if (user) {
    return res.redirect('/login');
  }

  user = new User({
    username,
    email,
    password
  });
  
  await user.save();

  res.redirect('/login');

});


router.post('/login', async (req, res) => {
  // expects {email: password:}
  const { email, password } = req.body;
  console.log(email, password)
  const user = await User.findOne({ 
    where: {email}
   })
  console.log(user)
  if (!user) {
    return res.redirect('/api/signup')
  }

  const matchPass = await bcrypt.compare(password, user.password)
  
  if (!matchPass) {
    return res.redirect('/login')
  }
  await req.session.save(() => {
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.loggedIn = true;
    res.json({ user: user.username, message: 'You are now logged in!' });
  })
  
  if(loggedIn){
    res.redirect('/dashboard')
  }
});


router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
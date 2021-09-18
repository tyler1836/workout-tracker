const Users = require('../../models/User');
// const Post = require('../../models/Post');
const router = require('express').Router();
const { User, posts} = require('sequelize')



router.get('/', (req, res) => {
    res.render('login')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/signup', async (req, res) => {
    
    const {username, email, password } = req.body;

    let user = await User.findOne({email});

    if(user){
        return res.redirect('/');
    }

    user = new User({
        username, 
        email,
        password
    });

    await user.save();

    res.redirect('/login');

});
   

router.post('/login', (req, res) => {
        // expects {email: password:}
        User.findOne({
          where: {
            email: req.body.email
          }
        }).then(dbUserData => {
          if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
          }
    
          const validPassword = dbUserData.checkPassword(req.body.password);
    
          if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
          }
          req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
    
            res.json({ user: dbUserData, message: 'You are now logged in!' });
          })
        });
 });

 router.post('/logout', (req, res) =>{
    if(req.session.loggedIn){
      req.session.destroy(()=>{
        res.status(204).end();
      });
    }
    else{
      res.status(404).end();
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
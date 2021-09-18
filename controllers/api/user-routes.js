const Users = require('../../models/User');
// const Post = require('../../models/Post');
const router = require('express').Router();
const { users, posts} = require('sequelize')



router.get('/', (req, res) => {
    res.render('login')
});

router.post('/', async (req, res) => {
    const {username, email, password } = req.body;

    let user = await Users.findOne({email});

    if(user){
        return res.redirect('/');
    }

    const hashedPsw = await bcrypt.hash(password, 12);

    user = new Users({
        username, 
        email,
        password: hashedPsw
    });

    await users.save();

    res.redirect('/');

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

module.exports = router;
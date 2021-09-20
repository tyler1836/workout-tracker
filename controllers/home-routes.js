const router = require('express').Router();



router.get('/', (req, res) => {
    res.render('test')
});

router.get('/login', (req, res) => {
    res.render('loginpage')
});

router.get('/error', (req, res) => {
    res.render('errorpage')
});

router.get('/signup', (req, res) => {
    res.render('signuppage')
});

router.get('/logout', (req, res) =>{
    res.render('readytologoutquestion')
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
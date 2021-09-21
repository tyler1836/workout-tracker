const router = require('express').Router();



router.get('/', (req, res) => {
    res.render('startpage')
});


router.get('/error', (req, res) => {
    res.render('errorpage')
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

    res.redirect('/startpage')
  });

module.exports = router;
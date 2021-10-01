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
  });

  router.get('/logout', (req, res)=> {
    res.render('goodbyepage')
  });

//   //render dashboard
//   router.get('/api/dasboard', (req, res) => {
//     res.render('notespage')
// });

module.exports = router;
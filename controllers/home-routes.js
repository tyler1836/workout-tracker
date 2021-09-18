const router = require('express').Router();



router.get('/', (req, res) => {
    res.render('htmllandingpage')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/error', (req, res) => {
    res.render('error')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/logout', (req, res) =>{
    res.render('logout')
})
module.exports = router;
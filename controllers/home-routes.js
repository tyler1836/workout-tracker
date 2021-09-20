const router = require('express').Router();



router.get('/', (req, res) => {
    res.render('test')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/error', (req, res) => {
    res.render('errorpage')
});

router.get('/signup', (req, res) => {
    res.render('sign')
});

router.get('/logout', (req, res) =>{
    res.render('logoutpage')
})
module.exports = router;
const router = require('express').Router();

router.use('/login', (req, res) => {
  res.render('login', { title: 'login' });
});

router.use('/', (req, res) => {
  res.render('blogs', { title: 'blogs' });
});

module.exports = router;

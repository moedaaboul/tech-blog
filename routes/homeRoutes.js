const router = require('express').Router();

router.use('/', (req, res) => {
  res.render('blogs', { title: 'blogs' });
});

module.exports = router;

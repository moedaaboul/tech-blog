const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.use('/register', (req, res) => {
  res.render('register', { title: 'register' });
});

router.use('/login', (req, res) => {
  res.render('login', { title: 'login' });
});

router.use('/post', (req, res) => {
  res.render('createPost', { title: 'Tech Blog' });
});

router.use('/:id', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const blogsData = await Blog.findAll({
        raw: true,
        //Other parameters
      });
      res.render('blogs', { title: 'Tech Blog', blogsData: blogsData });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
});

router.use('/', async (req, res) => {
  try {
    const dbblogsData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'email'],
          },
        },
      ],
    });
    console.log(dbblogsData);
    const blogsData = dbblogsData.map((el) => el.get({ plain: true }));
    console.log(blogsData);
    res.render('blogs', {
      title: 'Tech Blog',
      blogsData: blogsData,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = router;

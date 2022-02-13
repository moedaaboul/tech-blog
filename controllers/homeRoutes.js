const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.use('/register', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('register', { title: 'register' });
});

router.use('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('login', { title: 'login' });
});

router.use('/post', (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect('/');
  }
  res.render('createPost', { title: 'Tech Blog' });
});

// get all blogs
router.use('/dashboard', async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect('/login');
  }
  try {
    const dbblogsData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [['updatedAt', 'DESC']],
    });
    const dirtyBlogsData = dbblogsData.map((el) => el.get({ plain: true }));
    var blogsData = dirtyBlogsData.map(function (el) {
      var o = Object.assign({}, el);
      o.user = { name: req.session.user_name };
      return o;
    });

    res.render('blogs', {
      blogsData: blogsData,
      signedIn: req.session.logged_in,
      loggedOut: !req.session.logged_in,
      user: req.session.user_name,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.use('/blogs/edit/:id', async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect('/login');
  }
  const dbBlogsData = await Blog.findByPk(req.params.id);
  const blogsData = dbBlogsData.get({ plain: true });
  res.render('editPost', {
    title: 'Tech Blog',
    blogsData: blogsData,
    signedIn: req.session.logged_in,
    loggedOut: !req.session.logged_in,
  });
});

// get one blog
router.use('/blogs/:id', async (req, res) => {
  try {
    const dbBlogsData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ['password', 'email'],
              },
            },
          ],
        },
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['password', 'email'],
          },
        },
      ],
      order: [[{ model: Comment }, 'updatedAt', 'DESC']],
    });
    const blogsData = dbBlogsData.get({ plain: true });
    const permission = blogsData.user.id === req.session.user_id ? true : false;
    blogsData.comments.map(
      (e) =>
        (e.signedIn =
          req.session.logged_in && e.user_id === req.session.user_id)
    );
    res.render('singleBlog', {
      title: 'Tech Blog',
      blogsData: [blogsData],
      comments: blogsData.comments,
      permission,
      loggedOut: !req.session.logged_in,
      signedIn: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
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
      order: [['updatedAt', 'DESC']],
    });
    const blogsData = dbblogsData.map((el) => el.get({ plain: true }));
    res.render('blogs', {
      title: 'Tech Blog',
      blogsData: blogsData,
      signedIn: req.session.logged_in,
      loggedOut: !req.session.logged_in,
      user: req.session.user_name,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = router;

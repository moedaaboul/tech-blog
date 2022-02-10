const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');

router.get('/edit/:id', async (req, res) => {
  const dbBlogsData = await Blog.findByPk(req.params.id);
  const blogsData = dbBlogsData.get({ plain: true });
  console.log(blogsData);
  console.log([blogsData][0]);
  res.render('editPost', {
    title: 'Tech Blog',
    blogsData: blogsData,
  });
});

// get all blogs
router.get('/', async (req, res) => {
  try {
    const dbblogsData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const dirtyBlogsData = dbblogsData.map((el) => el.get({ plain: true }));
    var blogsData = dirtyBlogsData.map(function (el) {
      var o = Object.assign({}, el);
      o.user = { name: req.session.user_name };
      return o;
    });

    console.log(blogsData);
    res.render('blogs', {
      blogsData: blogsData,
      dashboard: true,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json({ newBlog, success: true });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

// get one blog
router.get('/:id', async (req, res) => {
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
    });
    const blogsData = dbBlogsData.get({ plain: true });
    console.log(blogsData.user.name);
    console.log(req.session.user_id);
    const permission = blogsData.user.id === req.session.user_id ? true : false;
    console.log(blogsData);
    console.log(permission);
    res.render('singleBlog', {
      title: 'Tech Blog',
      blogsData: [blogsData],
      comments: blogsData.comments,
      permission,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
router.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one blog by its `id` value
  await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ success: true });
});

module.exports = router;

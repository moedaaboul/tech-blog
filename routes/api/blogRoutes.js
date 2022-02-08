const router = require('express').Router();
const { Blog } = require('../../models');

// get all blogs
router.get('/', async (req, res) => {
  try {
    const dbblogsData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const blogsData = dbblogsData.map((el) => el.get({ plain: true }));
    console.log(blogsData);
    res.render('blogs', {
      title: false,
      dashboard: true,
      blogsData: blogsData,
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
    const dbBlogsData = await Blog.findByPk(req.params.id);
    const blogsData = dbBlogsData.get({ plain: true });
    console.log(blogsData);
    res.render('singleBlog', { title: 'Tech Blog', blogsData: [blogsData] });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body);
    res.json(updatedBlog);
  } catch (err) {
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

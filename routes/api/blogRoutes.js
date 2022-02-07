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

// get one blog
router.get('/:id', async (req, res) => {
  try {
    const blogsData = await Blog.findByPk(req.params.id);
    if (!blogsData) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    res.status(200).json(blogsData);
  } catch (err) {
    res.status(500).json(err);
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

router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body);
    res.json(updatedBlog);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  const blogsData = await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(blogsData);
});

module.exports = router;

const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');

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

const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newComment);
    res.json({ newComment, success: true });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

module.exports = router;

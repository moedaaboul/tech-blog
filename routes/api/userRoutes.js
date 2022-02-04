const router = require('express').Router();
const { User } = require('../../models');

// POST create a new user
router.post('/register', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log(userData);
    return res.json({ success: true });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

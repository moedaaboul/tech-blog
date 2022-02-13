const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// POST create a new user
router.post('/register', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_name = userData.name;
      res.json({ success: true });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      raw: true,
      where: { name: req.body.name },
    });
    if (!userData) {
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_name = userData.name;
      res.json({ success: true });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});

module.exports = router;

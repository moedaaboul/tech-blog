const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

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

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      raw: true,
      where: { email: req.body.email },
    });
    console.log(userData);
    if (!userData) {
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    console.log(validPassword, 'validPassword');
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }
    console.log(userData.id, 'id');
    console.log(userData.name, 'name');

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(req.session.user_id);
      console.log(req.session.logged_in);
      res.json({ success: true });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

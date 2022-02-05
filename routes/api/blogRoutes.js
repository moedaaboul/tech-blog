const router = require('express').Router();
const { Blog } = require('../../models');

// GET one blog
router.get('/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (req.session.logged_in) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view user blogs
    try {
      const dbBlogsData = await Blog.findByPk(req.params.id);
      console.log(dbBlogsData, 'dbBlogsData');
      const blogsData = dbBlogsData.get({ plain: true });

      res.render('blogs', {
        blogsData: blogsData,
        loggedIn: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;

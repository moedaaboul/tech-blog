const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const auth = require('../../middleware/auth');

router.use('/users', userRoutes);
router.use('/blogs', auth, blogRoutes);
router.use('/comments', auth, commentRoutes);

module.exports = router;

const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const UserRoutes = require('./UserRoutes');

router.use('/users', UserRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
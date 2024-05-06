const router = require('express').Router();
//import thought and user routes
const thoughtRoutes = require('./thoughtRoutes');
const UserRoutes = require('./UserRoutes');
//Get Router to Use User Routes 
router.use('/users', UserRoutes);
//Get Router to Use Thought Routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;
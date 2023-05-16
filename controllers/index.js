const router = require('express').Router();
const dashboardRoutes = require('./dashboard.js');
const apiRoutes = require('./api');
const homeRoutes = require('./home.js');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
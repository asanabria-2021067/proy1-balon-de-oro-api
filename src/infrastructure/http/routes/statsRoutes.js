const express = require('express');
const StatsController = require('../controllers/StatsController');

const router = express.Router();

router.get('/countries', StatsController.getCountryStats.bind(StatsController));

module.exports = router;

const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.getClients);

module.exports = router;

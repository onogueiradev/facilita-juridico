const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.getClients);
router.post('/', controllers.createClient);

module.exports = router;

const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.getClients);
router.post('/', controllers.createClient);
router.get('/visit-order', controllers.visitationOrder);
router.put('/', controllers.updateClient);

module.exports = router;

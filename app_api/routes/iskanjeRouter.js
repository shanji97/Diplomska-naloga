var router = require('express').Router();
var iskanjeCtrl = require('../controllers/iskanjeController');

router.get('/', iskanjeCtrl.iskanje);

module.exports = router;
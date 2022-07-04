const router = require('express').Router();
const iskanjeCtrl = require('../controllers/iskanjeController'); 

router.get('/', iskanjeCtrl.iskanje);

module.exports = router;
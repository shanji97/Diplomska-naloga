var router = require('express').Router();

var uporabnikiCtrl = require('../controllers/uporabnikiController');

router.get('/:idUporabnika', uporabnikiCtrl.podrobnostiUporabnika);

router.post('/obnoviGeslo/posljiZahtevoZaObnovo', uporabnikiCtrl.posljiZahtevoZaObnovoGesla);

router.post('/:idUporabnika', uporabnikiCtrl.posodobiUporabnika);

router.post('/izbrisi/:idUporabnika',uporabnikiCtrl.posljiZahtevoZaIzbris);
module.exports = router;
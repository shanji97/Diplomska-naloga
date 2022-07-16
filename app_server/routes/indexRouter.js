var router = require('express').Router();

var indexCtrl = require('../controllers/indexController');
var uporabnikiCtrl = require('../controllers/uporabnikiController');

// router.get('/', indexCtrl.sampleIndex);

router.get('/forum', indexCtrl.forum);
router.get('/forum/vnosTeme', indexCtrl.vnesiTemo);
router.get('/forum/:idKategorije/:idPodkategorije/:idTeme', indexCtrl.poglejTemo);
// router.get('/forum/:idPodkategorije', indexCtrl.podkategorija);
// router.get('/forum/:idPodkategorije/:idTeme',indexCtrl.kategorija);

router.get('/registracija', indexCtrl.registracija);
router.post('/registracija', uporabnikiCtrl.kreirajNovegaUporabnika);


router.post('/odjava', uporabnikiCtrl.odjaviUporabnika);
// router.get('/obnoviGeslo/', indexCtrl.sampleRecover);
//uporabniki controller -> router.post('/obnoviGeslo/posljiZahtevoZaObnovo', uporabnikiCtrl.posljiZahtevoZaObnovo);

// router.get('/novoGeslo/:emailUporabnika/:generiranZeton', indexCtrl.sampleUpdate);
router.post('/novoGeslo/:emailUporabnika/:generiranZeton', uporabnikiCtrl.posodobiGesloUporabnika);

// router.get('/splosniPogoji',indexCtrl.pogoji);
// router.get('/pravila',indexCtrl.pogoji);
// router.get('/ostalo',indexCtrl.pogoji);


// router.get('/statistike',indexCtrl.sampleCharts);

// router.get('/potrditevObnoveGesla', indexCtrl.samplePasswordConfirmation);

module.exports = router;
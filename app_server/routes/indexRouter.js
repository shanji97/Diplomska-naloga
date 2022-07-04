var router = require('express').Router();

var indexCtrl = require('../controllers/indexController');
var uporabnikiCtrl = require('../controllers/uporabnikiController');

router.get('/', indexCtrl.sampleIndex);

router.get('/db',indexCtrl.sampleDB);
router.post('/db/vnos', indexCtrl.vnosBaze);
router.post('/db/izbris', indexCtrl.izbrisBaze);

router.get('/registracija', indexCtrl.sampleRegister);
router.post('/registracija', uporabnikiCtrl.kreirajNovegaUporabnika);


router.get('/prijava',indexCtrl.sampleLogin);
router.post('/prijava',uporabnikiCtrl.pridobiPrijavnePodatke); 

router.post('/odjava', uporabnikiCtrl.odjaviUporabnika);
router.get('/obnoviGeslo/',indexCtrl.sampleRecover);
//uporabniki controller -> router.post('/obnoviGeslo/posljiZahtevoZaObnovo', uporabnikiCtrl.posljiZahtevoZaObnovo);

router.get('/novoGeslo/:emailUporabnika/:generiranZeton',indexCtrl.sampleUpdate); 
router.post('/novoGeslo/:emailUporabnika/:generiranZeton',uporabnikiCtrl.posodobiGesloUporabnika);

router.get('/splosniPogoji',indexCtrl.sampleTermsOfService);

router.get('/statistike',indexCtrl.sampleCharts);

router.get('/potrditevObnoveGesla',indexCtrl.samplePasswordConfirmation);

module.exports = router;
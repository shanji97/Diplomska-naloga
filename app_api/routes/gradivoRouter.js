const router = require('express').Router();
const ctrlGradivo = require('../controllers/gradivoController');

router.get('/:idGradiva', 
    ctrlGradivo.pridobiGradivo);

router.delete('/:idGradiva',
    ctrlGradivo.izbrisiGradivo);

router.post('/:idGradiva/komentar',
    ctrlGradivo.objaviKomentar);

router.post('/:idGradiva/prijava',
    ctrlGradivo.prijaviGradivo);

router.post('/:idGradiva/preklopiVidljivost',
    ctrlGradivo.preklopiVidljivostGradiva);

router.delete('/:idGradiva/komentar/:idKomentar',
    ctrlGradivo.izbrisiKomentar);

router.post('/:idGradiva/komentar/:idKomentar/prijava',
    ctrlGradivo.prijaviKomentar);



module.exports = router;
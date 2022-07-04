const axios = require('axios');
const pridobiSidebar = require('../pridobiSidebar');
const apiPovezava = require('../apiPovezava');
const uporabnikUtil = require('../uporabnikUtil');

const iskanje = async (req, res, next) => {
    try {
        var odgovor = await axios.get(apiPovezava(`/iskanje?iskalniIzraz=${req.query.iskalniIzraz}`));
        var rezultati = odgovor.data;

        res.render('iskanje', {
            title: 'Rezultati iskanja',
            uporabnik: uporabnikUtil.prijavljenUporabnik(req),
            iskalniIzraz: req.query.iskalniIzraz,
            gradiva: rezultati.gradiva,
            predmeti: rezultati.predmeti,
            osebje: rezultati.osebje,
            sidebarData: await pridobiSidebar()
        });
    }
    catch (napaka) {
        next(napaka);
    }
}

module.exports = {
    iskanje
}

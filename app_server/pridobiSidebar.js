const axios = require('axios');
const apiPovezava = require('./apiPovezava');

const najdiLetnike = function (predmeti) {
    var letniki = [];
    for (let predmet of predmeti) {
        let letnik = letniki.find(letnik => letnik.zaporednaSt == predmet.letnik);
        if (letnik) {
            letnik.predmeti.push(predmet);
        }
        else if (predmet.letnik && predmet.letnik > 0) {
            letniki.push({
                zaporednaSt: predmet.letnik,
                predmeti: [predmet]
            });
        }
    }

    return letniki;
}

const napolniModule = function (predmeti, moduli) {
    var moduliSPredmeti = moduli.map(modul => {
        return {
            id: modul._id,
            ime: modul.ime,
            predmeti: []
        };
    });

    for (let predmet of predmeti) {
        if (predmet.moduli) {
            let modul = moduliSPredmeti.find(modul => predmet.moduli.includes(modul.id));
            if (modul)
                modul.predmeti.push(predmet);
        }
    }

    return moduliSPredmeti;
}

const sidebarPredmet = function (predmet) {
    return {
        id: predmet._id,
        naziv: predmet.ime,
        final: true
    };
}

const sidebarModul = function (modul) {
    var prviSemester = sidebarSemester(modul.predmeti, 1);
    var drugiSemester = sidebarSemester(modul.predmeti, 2);

    var fields = [];
    if (prviSemester)
        fields.push(prviSemester);
    
    if (drugiSemester)
        fields.push(drugiSemester);

    return {
        naziv: modul.ime,
        fields: fields
    };
}

const sidebarLetnik = function (letnik) {
    var prviSemester = sidebarSemester(letnik.predmeti, 1);
    var drugiSemester = sidebarSemester(letnik.predmeti, 2);

    var fields = [];
    if (prviSemester)
        fields.push(prviSemester);

    if (drugiSemester)
        fields.push(drugiSemester);

    return {
        naziv: `${letnik.zaporednaSt}. letnik`,
        fields: fields
    };
}

const sidebarIzbirni = function (predmeti, vrsta) {
    var strokovniPredmeti = predmeti.filter(predmet => predmet.vrstaIzbirnega == vrsta);
    var prviSemester = sidebarSemester(strokovniPredmeti, 1);
    var drugiSemester = sidebarSemester(strokovniPredmeti, 2);

    var fields = [];
    if (prviSemester)
        fields.push(prviSemester);

    if (drugiSemester)
        fields.push(drugiSemester);

    return fields;
}

const sidebarSemester = function (predmeti, semester) {
    var semesterPredmeti = predmeti.filter(predmet => predmet.semester == semester);
    if (semesterPredmeti.length > 0)
        return {
            naziv: `${semester}. semester`,
            fields: semesterPredmeti.map(predmet => sidebarPredmet(predmet))
        };
    
    return null;
}

const generirajSidebar = function (predmeti, moduli) {
    var sidebar = [];

    var letniki = najdiLetnike(predmeti).sort(p => p.zaporednaSt);
    var moduliSPredmeti = napolniModule(predmeti, moduli).filter(modul => modul.predmeti.length > 0);
    
    var sidebarLetniki = letniki.map(letnik => sidebarLetnik(letnik));
    if (sidebarLetniki.length > 0)
        sidebar.push(...sidebarLetniki);

    var sidebarModuli = moduliSPredmeti.map(modul => sidebarModul(modul));
    if (sidebarModuli.length > 0)
        sidebar.push({
            naziv: 'Moduli',
            fields: sidebarModuli
        });

    var sidebarSplosni = sidebarIzbirni(predmeti, 1);
    if (sidebarSplosni.length > 0)
        sidebar.push({
            naziv: "Splošni izbirni predmeti",
            fields: sidebarSplosni
        });

    var sidebarStrokovni = sidebarIzbirni(predmeti, 2);
    if (sidebarStrokovni.length > 0)
        sidebar.push({
            naziv: "Strokovni izbirni predmeti",
            fields: sidebarStrokovni
        });

    return sidebar;
}

const pridobiSidebar = async function (predmeti, moduli) {
    var predmetiPromise = axios.get(apiPovezava('/predmeti'));
    var moduliPromise = axios.get(apiPovezava('/moduli'));

    var [predmetiOdgovor, moduliOdgovor] = await Promise.all([predmetiPromise, moduliPromise]);

    return generirajSidebar(predmetiOdgovor.data, moduliOdgovor.data);
}


module.exports = pridobiSidebar;


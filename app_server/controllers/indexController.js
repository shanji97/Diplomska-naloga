// const pridobiSidebar = require('../pridobiSidebar');
const apiPovezava = require('../apiPovezava');
const axios = require('axios').default;
const uporabnikUtil = require('../uporabnikUtil');


const sampleIndex = async (req, res) => {
    res.render('index', {
        title: 'Karjola',
        uporabnik: uporabnikUtil.prijavljenUporabnik(req)
        // sidebarData: await pridobiSidebar()

    });
}

const registracija = async (req, res) => {
    res.render('registracija', {
        title: 'Registracija',
    });
}
const forumRegister = async (req, res) => {
    res.render('forum', {
        title: 'Forum',
        // uporabnik:uporabnikUtil.prijavljenUporabnik(req)
    });
}
const sampleLogin = async (req, res) => {
    res.render('prijava', {
        title: 'Prijava',
        uporabnik: uporabnikUtil.prijavljenUporabnik(req)
        // sidebarData: await pridobiSidebar()
    });
}
const sampleRecover = async (req, res) => {
    res.render('obnoviGeslo', {
        title: 'Ponastavitev gesla',
        uporabnik: uporabnikUtil.prijavljenUporabnik(req)
        // sidebarData: await pridobiSidebar()
    });
}
const sampleUpdate = async (req, res) => {
    res.render('novoGeslo', {
        title: 'Vnesi novo geslo',
        uporabnik: uporabnikUtil.prijavljenUporabnik(req)
        // sidebarData: await pridobiSidebar()
    });
}

const samplePasswordConfirmation = (req, res) => {
    res.render('potditevObnoveGesla', {
        title: 'Geslo uspešno ponastavljeno!',
        uporabnik: uporabnikUtil.prijavljenUporabnik(req)
    });
}

const forum = (req, res) => {
    res.render('forum', {
        title: 'forum',
        uporabnik: uporabnikUtil.prijavljenUporabnik(req)
    });
}

const vnesiTemo = (req, res) => {
    res.render('vnesiTemo', {
        title: "Vnos nove teme"
    })
}

const poglejTemo = (req, res) =>{ 
    res.render('forumPost', {
        title: 'Ime teme'
    })
}
const sampleTermsOfService = async (req, res) => {
    res.render('', {
        title: 'Splošni pogoji',
        uporabnik: uporabnikUtil.prijavljenUporabnik(req),
        sidebarData: await pridobiSidebar(),
        sp_podnaslovi: [{
            podnaslov: "Splošno: ",
            vsebina: "Splošni pogoji uporabe spletne strani www.karjola.si (ponudnik Skupna 24 pri predmetu spletno programiranje, vključno z vsemi vključenimi podstranmi in aplikacijami) v nadaljevanju Karjola. OPOZORILO: Ob registraciji se uporabnik zaveže, da se strinja z vsemi določbami v spodaj navedenih splošnih pogojih uporabe plačljivih in brezplačnih vsebin/storitev spletnih strani portala Karjola.si. Z registracijo, prijavo oz. z uporabo portala se strinjate s splošnimi pogoji uporabe. V kolikor se z omenjenimi pogoji ne strinjate, registracija oz. prijava ni možna, uporabo portala pa vam odsvetujemo. Pogoji uporabe plačljivih in brezplačnih vsebin/storitev portala Karjola.si"
        }]
    });
};
const sampleDB = (req, res) => {
    res.render('db', {
        title: 'Podatkovna baza',
        uporabnik: uporabnikUtil.prijavljenUporabnik(req),
    });
};

const vnosBaze = async (req, res) => {
    console.log("vnos baze");
    axios({
        method: 'post',
        url: apiPovezava('/db')
    }).then((odgovor) => {
        res.redirect('/db');
    })
        .catch((napaka) => {
            console.log(napaka);
            res.redirect('/db');
        });
}

const izbrisBaze = (req, res) => {
    console.log("izbris baze");
    axios({
        method: 'delete',
        url: apiPovezava('/db')
    }).then((odgovor) => {
        res.redirect('/db');
    })
        .catch((napaka) => {
            console.log(napaka);
            res.redirect('/db');
        });

}

module.exports = {
    forum, 
    poglejTemo,
    registracija,
    vnesiTemo,

};


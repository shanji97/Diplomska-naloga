const mongoose = require('mongoose');
// const Gradivo = mongoose.model('Gradivo');
// const Predmet = mongoose.model('Predmet');
// const Osebje = mongoose.model('Osebje');

const iskanje = async (req, res, next) => {
    // try {
    //     var regex = new RegExp(req.query.iskalniIzraz, 'i');

    //     var gradiva = await Gradivo.find({
    //         visibility: true,
    //         $or: [
    //             {
    //                 'datoteka.ime': regex,
    //             },
    //             {
    //                 povezava: regex
    //             }
    //         ]
    //     });

    //     var gradivaIds = gradiva.map(g => g._id);

    //     var predmeti;
    //     if (gradivaIds.length == 0) {
    //         predmeti = await Predmet.find({
    //             $or: [
    //                 {
    //                     ime: regex,
    //                 }
    //             ]
    //         });
    //     }
    //     else {
    //         predmeti = await Predmet.find({
    //             $or: [
    //                 {
    //                     ime: regex,
    //                 },
    //                 {
    //                     gradiva: {
    //                         _id: {
    //                             $in: gradivaIds
    //                         }
    //                     }
    //                 }
    //             ]
    //         });
    //     }
        

    //     var predmetProfesorji = predmeti.map(p => p.profesorji).flat();
    //     var predmetAsistenti = predmeti.map(p => p.asistenti).flat();
    //     var predmetOsebje = predmetProfesorji.concat(predmetAsistenti);

    //     var osebje;
    //     if (predmetOsebje.length == 0) {
    //         osebje = await Osebje.find({
    //             $or: [
    //                 {
    //                     ime_priimek: regex
    //                 }
    //             ]
    //         });
    //     }
    //     else {
    //         osebje = await Osebje.find({
    //             $or: [
    //                 {
    //                     ime_priimek: regex
    //                 },
    //                 {
    //                     _id: {
    //                         $in: predmetOsebje
    //                     }
    //                 }
    //             ]
    //         });
    //     }

    //     var formatiraniPredmeti = predmeti.map(p => {
    //         return {
    //             _id: p._id,
    //             ime: p.ime
    //         };
    //     });

    //     var formatiranoGradivo = gradiva.map(g => {
    //         var predmet = formatiraniPredmeti.find(p => p._id == g.predmet);
            
    //         return {
    //             _id: g._id,
    //             ime: g.datoteka.ime,
    //             povezava: g.povezava,
    //             predmet: predmet
    //         };
    //     });

    //     var formatiranoOsebje = osebje.map(o => {
    //         return {
    //             _id: o._id,
    //             ime_priimek: o.ime_priimek
    //         };
    //     });

    //     res.json({
    //         gradiva: formatiranoGradivo,
    //         predmeti: formatiraniPredmeti,
    //         osebje: formatiranoOsebje
    //     });
    // }
    // catch (napaka) {
    //     next(napaka);
    // }
}


module.exports = {
    iskanje
};
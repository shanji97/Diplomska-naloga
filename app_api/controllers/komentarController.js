// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const Komentar = mongoose.model("Komentar");

const Novica = mongoose.model("Novica");

const kreirajKomentar = (req, res) =>{
    const idNovice = req.params.idNovice;
    Novica
    .findbyId(idNovice)
    .select("komentarji")
    .exec((napaka,novica) => {
        if(napaka){
            res.status(400).json(napaka);
        }else{
            dodajKomentar(req, res, novica);
        }
    });
}
const dodajKomentar = (req,res,novica) =>{
    novica.komentarji.push({
        avtor: req.body.naziv,
        besedilo: req.body.komentar
    });
    novica.save((napaka, novica) =>{
        if(napaka){
            res.status(400).json(napaka);
        }
        else{
            res.status(201).json(novica.komentarji.slice(-1).pop());
        }
    })
}

const posodobiKomentar = (req,res) =>{
    var idNovice = req.params.idNovice;
    var idKomentarja = req.params.idKomentarja;
    Novica
    .findbyId(idNovice)
    .select("komentarji")
    .exec((napaka, novica) =>{
        if(napaka){
            return res.status(500).json(napaka);
        }
        const trenuniKomentar = novica.komentarji.id(idKomentarja);
        trenutniKomentar.avtor = req.body.avtorKomentarja;
        trenutniKomentar.avtor = req.body.besedilo;
        
    });
}

const izbrisiKomentar = (req,res) => {
    const {idNovice,idKomentarja} = req.params;
}

module.exports = {
    kreirajKomentar,
    dodajKomentar,
    posodobiKomentar
}
// consprikaziVse = (req, res) => {
//     Novica
//     .find()
//     .exec((napaka, novice) => {
//         if(napaka){
//             res.status(500).json(napaka);
//         }
//         else{
//             res.status(200).json(
//                     novice.map(novica =>{ 
//                         return{
//                             "_id": novica.id,
//                             "naslov": novica.naslov,
//                             "avtor": novica.avtor,
//                             "kreirana": novica.kreirana,
//                             "besedilo": novica.besedilo,
//                             "komentarji": novica.komentarji
//                         };
//                     })
//             );
//        }
//     });
// }

// const posljiNovico = (req, res) => {
//     Novica.create({
//                 naslov:req.body.naslov,
//                 avtor:req.body.avtor,
//                 kategorija: req.body.kategorija,
//                 besedilo: req.body.besedilo,
//     }, (napaka, novica) =>{
//         if(napaka){
//             return res.status(400).json(napaka);
//         }
//         else{
//             return res.status(201).json(novica);
//         }
//     });
// }

// const prikaziIzbrano = (req,res) => {
//      Novica
//      .findById(req.params.idNovice)
//      .exec((napaka, novica) =>{
//         if(napaka) {
//             return res.status(500).json(napaka);
//         }
//         else if(!novica){
//             return res.status(404).json({
//                 "sporočilo": "Ne najdem novice. Id novice je obvezen parameter."
//                             });
//         }
//         return res.status(200).json(novica);
//      });
// }

// const izbrisiIzbrano = (req, res) =>{
//     const {idNovice} = req.params;
//     if(idNovice){
//         Novica
//         .findByIdAndRemove(idNovice)
//         .exec((napaka )=> {
//             if(napaka){
//                 return res.status(500).json(napaka);
//             }
//             else{
//                 return  res.status(204).json(null);
//     	    }
//         });
//     }
//     else{
//         return  res.status(404).json({"sporočilo": "Ne najdem novice. Id novice je obvezen parameter."});
//     }
   
// }

// const posodobiIzbrano = (req, res) => {
//     Novica
//     .updateOne( {"_id": req.params.idNovice},
//                 { $set: {
//                     naslov:req.body.novNaslov,
//                     avtor:req.body.novAvtor, 
//                     posodobljena: Date.now,
//                     besedilo: req.body.novoBesedilo
//                 }},
//                 (napaka) => {
//                    if(napaka){
//                     return res.status(400).json(napaka);
//                    }else{
//                     return res.status(200).json({
//                            "sporočilo": "Novica uspešno spremenjena."
//                        });
//                    }         
//                 }
//     )

// }

// module.exports = {
//     prikaziVse,
//     posljiNovico,
//     prikaziIzbrano,
//     izbrisiIzbrano,
//     posodobiIzbrano
// }

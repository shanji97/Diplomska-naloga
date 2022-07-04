const mongoose = require("mongoose");
const generirajObnovitveniZeton = require('../pomozneFunkcije');

const User = mongoose.model("User");

const prikazi = (req, res) => {
    User
    .find()
    .exec((napaka,uporabniki)=>{
        if(napaka){
            res.status(500).json(napaka);
        }else{
            res.status(200).json(
                uporabniki.map(uporabnik => {
                    return{
                        "_id":uporabnik._id,
                        "userName": uporabnik.userName,
                        "email":uporabnik.email,
                        "isAdmin": uporabnik.isAdmin,
                        "posta":uporabnik.posta,
                        "kraj":uporabnik.kraj
                    };
                })
            );
        }
  });
  };
const registrirajUporabnika = (req, res) => {

//#region  ERROR HANDLING PRI KREIRANJU NOVEGA UPORABNIKA
    if( !req.body.uporabniskoime || !req.body.ePosta || !req.body.novoGeslo || !req.body.ponoviNovoGeslo ||
        !req.body.naslov || !req.body.posta || !req.body.kraj){
            return res.status(400).json({
                    "sporočilo":"Vsi podatki v obrazcu morajo biti izpolnjeni!"
            });
        }
    
    if(!new RegExp("[a-z]{2}[0-9]{4}@student.uni-lj.si").test(req.body.ePosta)){
        return res.status(400).json({
            "sporočilo": " Uporabi svoj študentski email, ki si ga prejel od UL!"
        });
    }
    if(!(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@€#\$%\^&\*])(?=.{8,})").test(req.body.novoGeslo)) || req.body.novoGeslo != req.body.ponoviNovoGeslo){
        return res.status(400).json({
            "sporočilo": "Geslo mora ustrezati naslednjim kriterijem: Geslo more vsebovati vsaj eno veliko in eno majhno črko. Geslo mora vsebovati vsaj eno številko in biti dolgo 8 znakov. Prav tako poskrbi, da bo v obe polji vpisano isto geslo!"
        }) 
    }    
//#endregion
    
        User.create({
            userName: req.body.uporabniskoime,
            email:req.body.ePosta,
            passwordHash:req.body.novoGeslo,
            naslov: req.body.naslov,
            kraj:req.body.kraj,
            posta: req.body.posta, 
            zetonZaObnavljanjeGesla: generirajObnovitveniZeton()
    }, (napaka,uporabnik) => {
        if(napaka){
          return res.status(400).json(napaka);
        }else{
           return res.status(201).json(uporabnik);
        }
    });
    
    
};
const pridobiPrijavnePodatkeUporabnika  = (req,res) =>{
    
    if(!req.body.ePosta || !req.body.geslo){
       return res.status(400).json({
            "sporocilo": "Vsaj en parameter (epošta ali geslo) manjka. Podana moreta biti oba parametra!"
        });
    }
    if(!new RegExp("[a-z]{2}[0-9]{4}@student.uni-lj.si").test(req.body.ePosta)){
        return res.status(400).json({
            "sporočilo": " Uporabi svoj študentski email, ki si ga prejel od UL!"
        });
    }
    User
    .findOne({email: req.body.ePosta,passwordHash: req.body.geslo})
    .exec((napaka,uporabnik)=>{
        if(napaka){
           return res.status(404).json({
                "sporocilo" : "Uporabnika s tako kombinacijo epošte in gesla v bazi ni!"
            });
        }else{
           return res.status(200).json(
                    {
                        "_id":uporabnik._id,
                        "userName": uporabnik.userName,
                        "isAdmin": uporabnik.isAdmin,
                    }
                );
        }

    });
}
const preberiIzbranega = (req, res) => {
    if(!req.params.idUporabnika){
        return res.status(400).json({
            "sporočilo": "Ne najdem uporabnika. idUporabnika je obvezen parameter."
        });
    }
    User
    .findById(req.params.idUporabnika)
    .exec((napaka,uporabnik) =>{
        if(!uporabnik){
            return res.status(404).json({
                "sporočilo": "Ne najdem uporabnika s podanim enoličnim indetifikatorjem idUporabnika."
            });
        } else if(napaka){
            return res.status(500).json(napaka);
        }
        return res.status(200).json(uporabnik);
    });
  };
const posodobiIzbranega = (req, res) => {
    if(!req.params.idUporabnika){
        return res.status(404).json({
            "sporočilo": "Ne najdem uporabnika. idUporabnika je obvezen parameter."
        });
    }
    if(!req.body.novoUporabniskoIme){
        return res.status(400).json({
            "sporočilo": "Novo uporabniško ime je obvezen parameter."
        })
    }
    User
    .updateOne( {"_id": req.params.idUporabnika},
                { $set: {userName:req.body.novoUporabniskoIme}},
                (napaka) => {
                   if(napaka){
                    return res.status(400).json(napaka);
                   }else{
                    return res.status(200).json({
                           "sporočilo": "Uporabniško ime uspešno spremenjeno!"
                       });
                   }         
                }
    )
  };
const posodobiGeslo = (req, res) => {
    if(!req.params.idUporabnika){
        return res.status(404).json({
            "sporocilo": "Ne najdem uporabnika. idUporabnika je obvezen parameter."
        });
    }
    if(!req.body.trenutnoGeslo || !req.body.novoGeslo || !req.body.potrdiNovoGeslo){
        return res.status(400).json({
            "sporocilo": "Eno izmed zahtevanih gesel ni vnešeno. Gesla morajo biti nujno vnešena."
        });
    }
    var novoGeslo  = req.body.novoGeslo; var potrdiGeslo = req.body.potrdiNovoGeslo;

    if(!(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@€#\$%\^&\*])(?=.{8,})").test(novoGeslo)) || novoGeslo != potrdiGeslo){
        return res.status(400).json({
            "sporočilo": "Geslo ne ustreza zahtevanim parametrom! Če si karkoli na strani dregal spravi to v nazaj v normalno stanje in poglej kaj si mogoče naredil narobe."
        });
    }
    User
    .updateOne( {"_id": req.params.idUporabnika, passwordHash: req.body.trenutnoGeslo},
                { $set: {passwordHash:req.body.novoGeslo}},
                (napaka) => {
                    if(napaka){
                        res.status(400).json(napaka);
                    }else{
                        res.status(200).json({
                            "sporočilo" : "Geslo uspešno spremenjeno."
                        });
                    }         
                }//a bi slučajno falil exec ?
    )
  };
const vnosZetona = (req,res) =>{
    if(!req.body.ePosta ){
        return res.status(400).json({
            "sporočilo": "Epošta uporabnika manjka! Parameter je obvezen"
        });
    }
    if(!(new RegExp("[a-z]{2}[0-9]{4}@student.uni-lj.si").test(req.body.ePosta))){
        return res.status(400).json({
            "sporočilo": "Izgleda da nisi študent UL! Hm, "
        });
    }
    var generiranZeton = generirajObnovitveniZeton();
     User
    .updateOne( {email: req.body.ePosta},
                { $set: {zetonZaObnavljanjeGesla:generiranZeton}},
                (napaka, sporociloQueryja) => {
                    if(napaka){
                       return res.status(400).json(napaka);
                    }else{
                        return res.status(200).json({
                            zeton : generiranZeton,
                            status: JSON.stringify(sporociloQueryja),
                            "sporočilo" : "Žeton uspešno dodan."
                        });
                    }         
                }
    );
    
  };

const obnoviGeslo = (req,res) =>{
    if(!req.body.ePosta || !req.body.zetonZaPosodobitev || !req.body.novoGeslo){
        return res.status(400).json({
            "sporocilo" : "Parametri ePosta, zeton za posodobitev in seveda novo geslo."
        });
    }
    
    User
    .updateOne( {"email": req.body.ePosta, zetonZaObnavljanjeGesla: req.body.zetonZaPosodobitev},
                { $set: {zetonZaObnavljanjeGesla:generirajObnovitveniZeton(),passwordHash: req.body.novoGeslo }},
                (napaka) => {
                    if(napaka){
                        console.log(napaka);
                       return res.status(400).json(napaka);
                    }else{
                        return res.status(200).json({
                            "sporočilo" : "Žeton uspešno dodan."
                        });
                    }         
                }//a bi slučajno falil exec ?
    )

}
const izbrisiIzbranega = (req, res) => {
        const {idUporabnika} = req.params;
        if(idUporabnika){
            User
            .findByIdAndRemove(idUporabnika)
            .exec((napaka) =>{
                if(napaka){
                    return res.status(500).json(napaka);
                }
              return res.status(204).json(null);
            });
        }
        else{
          return  res.status(404).json({
                "sporočilo": "Ne najdem uporabnika, idUporabnika je obvezen parameter."
            });
        }     
  };

  module.exports = {
        prikazi,
        registrirajUporabnika,
        pridobiPrijavnePodatkeUporabnika,
        preberiIzbranega,
        posodobiIzbranega,
        posodobiGeslo,
        obnoviGeslo,
        vnosZetona,
        izbrisiIzbranega   
  };
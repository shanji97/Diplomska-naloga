const axios = require("axios");
const nodemailer = require("nodemailer");
const sidebar = require('../pridobiSidebar');
const uporabnik = require('../uporabnikUtil');

var apiParametri ={
    streznik: "http://localhost:" + (process.env.PORT || 3000)
};
if(process.env.NODE_ENV === "production"){
    apiParametri.streznik = 'https://sp-lp24-karjola.herokuapp.com';
}

const kreirajNovegaUporabnika = async(req, res, next) =>{

//#region  ERROR HANDLING PRI KREIRANJU NOVEGA UPORABNIKA
    if( !req.body.uporabniskoime || !req.body.ePosta || !req.body.novoGeslo || !req.body.ponoviNovoGeslo ||
        !req.body.naslov || !req.body.posta || !req.body.kraj){
            res.status(400).json({
                    "sporočilo":"Vsi podatki v obrazcu morajo biti izpolnjeni!"
            });
        }
    
    if(!new RegExp("[a-z]{2}[0-9]{4}@student.uni-lj.si").test(req.body.ePosta)){
        res.status(400).json({
            "sporočilo": " Uporabi svoj študentski email, ki si ga prejel od UL!"
        });
    }
    if(!(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@€#\$%\^&\*])(?=.{8,})").test(req.body.novoGeslo)) || req.body.novoGeslo != req.body.ponoviNovoGeslo){
        res.status(400).json({
            "sporočilo": "Geslo mora ustrezati naslednjim kriterijem: Geslo more vsebovati vsaj eno veliko in eno majhno črko. Geslo mora vsebovati vsaj eno številko in biti dolgo 8 znakov. Prav tako poskrbi, da bo v obe polji vpisano isto geslo!"
        }) 
    }    
//#endregion

    try{
            let odgovor = await axios.post(apiParametri.streznik + "/api/uporabniki/registriraj",{
                uporabniskoime: req.body.uporabniskoime,
                ePosta: req.body.ePosta,
                novoGeslo: req.body.novoGeslo,
                ponoviNovoGeslo: req.body.ponoviNovoGeslo,
                naslov: req.body.naslov,
                posta: req.body.posta,
                kraj: req.body.kraj                
        })
        console.log(odgovor.data);
        if(odgovor.status == 201){
                
                res.redirect("/prijava");
        }
        else if(odgovor.status >= 400){
            console.log("Nekaj si zafrknil")
            res.status(odgovor.status).json({
                "sporocilo": "Nekaj je šlo po zlu"
            });
        }
    }
    catch(napaka){
        next(napaka);
    }
}   
const podrobnostiUporabnika = async (req, res, next) =>{

    if(!req.params.idUporabnika){
        res.status(404).json({
            "sporočilo": "Ne najdem parametra idUporabnika, ki je obvezen parameter"
        });
    }

    
    try{
            let odgovor = await axios.get(apiParametri.streznik + "/api/uporabniki/" + req.params.idUporabnika);
            if(odgovor.status == 200){
                userSettings(req, res, odgovor.data);
            }else{
                res.status(odgovor.status).json(odgovor.status.sporočilo);
            }
    } catch(napaka){
        next(napaka);
    }
   
}

const posodobiUporabnika = async (req, res, next) => {

    if(!req.body.obrazec){
        res.status(400).json({
            "sporocilo" : "Parameter obrazec manjka! Je obvezen!"
        });
    }
    
    //
    if (req.body.obrazec == 'posodobiGeslo') {
        await posodobiGeslo(req, res, next);
    }
    else if (req.body.obrazec == 'posodobiUporabniskoIme') {
        await posodobiUporabniskoIme(req, res, next);
    }else{
        res.status(400).json({
            "sporočilo": "Si po spremembi te vrednosti pričakoval drugo spročilo?"
        });
    }

}
const pridobiPrijavnePodatke = async (req,res,next) =>{ //daj v pravilno datoteko
    
    if(!req.body.ePosta || !req.body.trenutnoGeslo){
        res.status(400).json({
            "sporocilo" : "Parameter obrazec manjka! Je obvezen!"
        });
    }
    
    try{
        let odgovor  = await axios.post(apiParametri.streznik + "/api/uporabniki/pridobiPrijavljenega",{
            ePosta: req.body.ePosta,
            geslo: req.body.trenutnoGeslo
        });
        console.log(odgovor);
        if(odgovor.status == 200){

            var cookie  = req.cookies.cookieName;
            if(cookie === undefined){
                var nakljucnaStevilka = Math.random().toString();
                nakljucnaStevilka = nakljucnaStevilka.substring(2, nakljucnaStevilka.length),
                res.cookie('uporabniskiPiskot',JSON.stringify(odgovor.data),{maxAge: 900000, httpOnly: true });
                console.log("Uspesno kreiran piskot");
            }else{
                console.log("Kuki že obstaja", cookie);
            }
            
            if(odgovor.data.isAdmin){
                res.redirect("/admin");
            }
            else{
                res.redirect("/");
            }

        }else if (odgovor.status >= 400){
            res.status(odgovor).json({
                "sporocilo":"Nekaj si fix zafrknil. Podaj vse parametre v zahtevani obliki!"
            })
        }

    }catch(napaka){
        next(napaka);
    }
}
const posodobiGeslo = async (req, res, next) => {

//#region  ERROR HANDLING PRI POSODOBITVI GESLA PRI UPORABNIKU
    if(!req.params.idUporabnika){
        return res.status(404).json({
            "sporočilo": "Ne najdem parametra idUporabnika, ki je obvezen parameter"
        });
    }
    if(!req.body.trenutnoGeslo || !req.body.novoGeslo || !req.body.potrdiNovoGeslo){
        return res.status(400).json({
            "sporočilo": "Gesla niso podana! Podaj novo trenutno geslo in 2x novo geslo!"
        });
    }
    if(!(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@€#\$%\^&\*])(?=.{8,})").test(req.body.novoGeslo)) || req.body.novoGeslo != req.body.potrdiNovoGeslo){
        res.status(400).json({
            "sporočilo": "Geslo mora ustrezati naslednjim kriterijem: Geslo more vsebovati vsaj eno veliko in eno majhno črko. Geslo mora vsebovati vsaj eno številko in biti dolgo 8 znakov. Prav tako poskrbi, da bo v obe polji vpisano isto geslo"
        });
    }    
//#endregion
    try {
        let odgovor = await axios.put(apiParametri.streznik + "/api/uporabniki/" + req.params.idUporabnika + "/posodobiGeslo",{
            trenutnoGeslo: req.body.trenutnoGeslo,
            novoGeslo: req.body.novoGeslo,
            potrdiNovoGeslo: req.body.potrdiNovoGeslo
        }
       
        );
        
        
        if (odgovor.status == 200) {
           
            res.redirect("/uporabniki/" + req.params.idUporabnika);
        }
        else if (odgovor.status >= 400) {
            res.status(odgovor.status).json({
                "sporocilo":"Nekaj zi zafrknil"
            });
        }       
    }
    catch (napaka) {
        next(napaka);
    }
};
const posodobiUporabniskoIme = async (req, res, next) => {

    if(!req.params.idUporabnika || !req.body.novoUporabniskoIme){
        res.status(404).json({
            "sporocilo": "Zahtevani so vsi parametri"
        });
    }
    try {
        let odgovor = await axios.put(apiParametri.streznik + "/api/uporabniki/" + req.params.idUporabnika + "/posodobiUporabniskoIme",{
           novoUporabniskoIme : req.body.novoUporabniskoIme
        });
        if (odgovor.status == 200) {
           
            console.log("Uporabniško ime uspešno spremenjeno");
            res.redirect("/uporabniki/" + req.params.idUporabnika);
        }
        else if (odgovor.status >= 400) {
           res.status(404).json({
               "sporočilo": "Nekaj si zafrknil!"
           });
        }       
    }
    catch (napaka) {
        next(napaka);
    }
};
const posljiZahtevoZaObnovoGesla = async (req,res,next) =>{
    
    if(!req.body.ePosta || !new RegExp("[a-z]{2}[0-9]{4}@student.uni-lj.si").test(req.body.ePosta)){
        res.status(400).json({
            "sporočilo": " Uporabi svoj študentski email, ki si ga prejel od UL!"
        });
    }
   
    try{
        let odgovor = await axios.put(apiParametri.streznik + "/api/uporabniki/vnosZetona",{
            ePosta : req.body.ePosta
        });

        if(odgovor.status == 200){
           
            var o = JSON.parse(odgovor.data.status);
        
            if(o.nModified == 0){
                console.log("Jebiga, ne obstajaš");
                return res.redirect("/registracija");
            }
            var besediloPoste = `
            <p>Karjola ti je pripeljala link do obnovitve gesla</p>
            <p>Na naslednji <a href="${apiParametri.streznik + "/novoGeslo/"+ req.body.ePosta + "/" + odgovor.data.zeton}">povezavi</a> si lahko obnoviš svoje geslo.</p>
            <p> Če nisi tega gesla zahteval(a) ti, to spročilo ignoriraj.</p>`;
            
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'test.aplikacija00tnuv00moja11ul@gmail.com',
                    pass: 'Terminalske_naprave22'
                }
            });
            let nastavitvePoste = {
                from: '"Karjola Support" <test.aplikacija00tnuv00moja11ul@gmail.com>',
                to: `${req.body.ePosta}`,
                subject: "Povezava za obnovitev gesla",
                text: "Evo tu maš povezavo!",
                html: besediloPoste
            }
            transporter.sendMail(nastavitvePoste, function(napaka,odgovor){
                if(napaka){
                    console.log("Zgodila se je napaka");
                }else{
                    console.log("Sporočilo uspešno poslano");
                }
            });
            res.redirect("/prijava");
        }
        else if (odgovor.status >= 400){
            res.status(odgovor.status).json(
                {"sporocilo": "Nekaj si zafrknil! Rollbackaj na začetno stanje!"}
            );
          
        }
    }catch(napaka){
        next(napaka);
    }
};
const posljiZahtevoZaIzbris =  async (req,res,next) =>{

    try{
        let odgovor = await axios.delete(apiParametri.streznik + "/api/uporabniki/" + req.params.idUporabnika);

        if(odgovor.status == 204){
            
            res.cookie('uporabniskiPiskot',"",{maxAge: 0, httpOnly: true });
            res.redirect("/registracija");

        }else{
            console.log("Ta uporabnik ne obstaja");
        }
    
    } catch(napaka){
        next(napaka);
    }
}
const posodobiGesloUporabnika = async (req, res, next) =>{ //daj v pravilno datoteko 
    
    if(!req.params.emailUporabnika || !req.body.novoGeslo || !req.body.potrdiNovoGeslo || !req.params.generiranZeton){
        res.status(400).json({
            "sporocilo": "Daj sem vse intended paramatre, drugače ne bo šlo"
        });
    }
    
    try {
        let odgovor = await axios.put(apiParametri.streznik + "/api/uporabniki/obnovitevGesla",{
            ePosta: req.params.emailUporabnika,
            novoGeslo: req.body.novoGeslo,
            potrdiNovoGeslo: req.body.potrdiNovoGeslo,
            zetonZaPosodobitev: req.params.generiranZeton
        }
        );

        if (odgovor.status == 200) {
           
            res.redirect("/prijava");
        }
        else if (odgovor.status >= 400) {
            res.status(odgovor.status).json(
                {"sporocilo": "Nekaj si zafrknil! Rollbackaj na začetno stanje!"}
            );
        }       
    }
    catch (napaka) {
        next(napaka);
    }
}
const odjaviUporabnika = (req,res) =>{
    res.cookie('uporabniskiPiskot',"",{maxAge: 0, httpOnly: true });
    res.redirect("/");
}
const userSettings = async (req, res, podrobnostiUporabnika) => {
    res.render('uporabniskeNastavitve', {
        title: 'Uporabniške nastavitve',
        uporabnik: uporabnik.prijavljenUporabnik(req),
        username: podrobnostiUporabnika.userName,
        email: podrobnostiUporabnika.email,
        idUporabnika: podrobnostiUporabnika._id,
        sidebarData: await sidebar()
    });
};


module.exports = {
    podrobnostiUporabnika,
    kreirajNovegaUporabnika,
    pridobiPrijavnePodatke,
    odjaviUporabnika,
    posodobiUporabnika,
    posljiZahtevoZaObnovoGesla,
    posljiZahtevoZaIzbris,
    posodobiGesloUporabnika
}

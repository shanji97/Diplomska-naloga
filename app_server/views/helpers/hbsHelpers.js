const hbs = require('hbs');
const moment = require('moment');

hbs.registerHelper('makeUnique', (lvalue, operator, rvalue) => {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    //not sure kolk zanesljivo je tole ampak zgleda da dela
    return (lvalue + (rvalue+2)**3);
});

hbs.registerHelper('formatirajIzpisNastavitev', (stevilka, tip) => {
    //console.log("stevilka: "+stevilka + ", tip: " +tip);
    if (tip === 'letnik') {
        switch(stevilka) {
            case 1:
                return '1. letnik';
            case 2:
                return '2. letnik';
            case 3:
                return '3. letnik';
            default:
                return 'Ni v letniku'      
        }
    } else if (tip === 'semester') {
        switch(stevilka) {
            case 1:
                return 'Zimski semester';
            case 2:
                return 'Poletni semester';
        }
    } else if (tip === 'vrstaIzbirnega') {
        switch(stevilka) {
            case 1:
                return 'Splošni izbirni predmet';
            case 2:
                return 'Strokovni izbirni predmet';
            default:
                return 'Ni izbirni predmet';
        }
    }
    return '';
});


hbs.registerHelper('uppercase', (aString) => {
    return aString.toUpperCase();
});

hbs.registerHelper('ifLength', function (array, len, options) {
    return array.length == len ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('ifEqual', function (first, second, options) {
    return first == second ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('ifEither', function (first, second, options) {
    return first || second ? options.fn(this) : options.inverse(this);
}); 

hbs.registerHelper('formatDate', function (datetime) {
    const dateFormat = "dddd, DD.MM.YYYY HH:mm";
    moment.locale('sl');
    return moment(datetime).format(dateFormat);
});
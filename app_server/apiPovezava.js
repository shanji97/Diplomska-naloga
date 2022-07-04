var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000),
    pot: 'api'
};

if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = process.env.API_SERVER_URI;
}

const apiPovezava = (link, parametri) => {
    var parametriziranLink = link.replace('/', '');
    for (var param in parametri) {
      parametriziranLink = parametriziranLink.replace(`:${param}`, parametri[param]);
    }

    return new URL(apiParametri.pot + '/' + parametriziranLink, apiParametri.streznik).toString();
}

module.exports = apiPovezava;
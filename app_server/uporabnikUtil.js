const jeUporabnikPrijavljen = req => {
    if (req.cookies['uporabniskiPiskot']) {
        return true;
    }
    return false;
}

const prijavljenUporabnik = req => {
    if (!req.cookies['uporabniskiPiskot']) {
        return null;
    }
    var cookie = JSON.parse(req.cookies['uporabniskiPiskot']);
    if (cookie) {
        return {
            _id: cookie._id,
            userName: cookie.userName,
            isAdmin: cookie.isAdmin
        };
    }
    return null;
}

module.exports = {
    jeUporabnikPrijavljen,
    prijavljenUporabnik
}
const filmMiddleware = {
    increaseID: function (lastFilmID, record) {
        const recordLen = record.toString().length;
        lastFilmID = [...lastFilmID];
        lastFilmID.splice(lastFilmID.length - recordLen, recordLen, record + 1);
        return lastFilmID.join("");
    },
    parentID: function (date) {
        let year = new Date(date).getFullYear();
        year = year.toString().slice(-2);
        let mon = new Date(date).toLocaleDateString().split("/")[0];
        mon = mon.toString().length === 1 ? "0"+mon : mon;
        return "F"+year+mon;
    },
    find: function (model) {
        return async function (condition) {
            try {
                const docs = await model.find(condition);
                return docs
            } catch (error) {
                console.log(error);
            }
        } 
    },
    newFilmID: function (docs, parentID) {
        let filmID = null;
        if (docs != 0) {
            const record = docs.length;
            const lastFilmID = docs[record-1].filmID;
            filmID = filmMiddleware.increaseID(lastFilmID, record);
            return filmID
        }
        return filmID = parentID+"00001";
    },
}

module.exports = filmMiddleware
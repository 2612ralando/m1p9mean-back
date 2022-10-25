var mongoose = require('mongoose');

var Plat = mongoose.model('Plat', {
    created_at: { type: String },
    updated_at: { type: String },
    idPlat: { type: String },
    nomPlat: { type: String },
    categorie: { type: String },
    details: { type: String },
    prix: { type: String },
    idResto: { type: String },
});
module.exports = {
    Plat: Plat
};

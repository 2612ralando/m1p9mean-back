var mongoose = require('mongoose');

var Resto = mongoose.model('Resto', {
    created_at: { type: String },
    updated_at: { type: String },
    idResto: { type: String },
    name: { type: String },
    adresse: { type: String },
    email: { type: String },
    phoneNumber: { type: String }
});
module.exports = {
    Resto: Resto
};

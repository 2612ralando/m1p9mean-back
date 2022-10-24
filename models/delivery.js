var mongoose = require('mongoose');

var Delivery = mongoose.model('Delivery', {
    created_at: { type: String },
    updated_at: { type: String },
    delivery_deliverer: { type: String },
    delivery_client: { type: String },
    delivery_location: { type: String },
    delivery_date: { type: String },
    delivery_price: { type: Number },
    delivery_count: { type: Number },
    id_order: { type: String }
});
module.exports = {
    Delivery: Delivery
};

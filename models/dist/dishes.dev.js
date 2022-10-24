"use strict";

var mongoose = require('mongoose');

var Dishes = mongoose.model('Dishes', {
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
  dishes_name: {
    type: String
  },
  dishes_desc: {
    type: String
  },
  dishes_price: {
    type: Number
  },
  // dishes_img: { type: String },
  id_restaurant: {
    type: String
  }
});
module.exports = {
  Dishes: Dishes
};
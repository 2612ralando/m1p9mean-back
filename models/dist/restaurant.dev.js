"use strict";

var mongoose = require('mongoose');

var Restaurant = mongoose.model('Restaurant', {
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
  restaurant_name: {
    type: String
  },
  restaurant_location: {
    type: String
  },
  restaurant_phone: {
    type: String
  },
  restaurant_email: {
    type: String
  },
  restaurant_password: {
    type: String
  },
  restaurant_logo: {
    type: String
  }
});
module.exports = {
  Restaurant: Restaurant
};
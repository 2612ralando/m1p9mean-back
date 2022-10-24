"use strict";

var mongoose = require('mongoose');

var Deliverer = mongoose.model('Deliverer', {
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
  deliverer_name: {
    type: String
  },
  deliverer_email: {
    type: String
  },
  deliverer_phone: {
    type: String
  },
  deliverer_password: {
    type: String
  },
  deliverer_disponibility: {
    type: String
  }
});
module.exports = {
  Deliverer: Deliverer
};
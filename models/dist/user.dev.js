"use strict";

var mongoose = require('mongoose');

var User = mongoose.model('User', {
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
    type: String
  },
  id_profile: {
    type: String
  }
});
module.exports = {
  User: User
};
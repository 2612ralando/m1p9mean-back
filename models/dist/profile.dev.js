"use strict";

var mongoose = require('mongoose');

var Profile = mongoose.model('Profile', {
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
  profile_name: {
    type: String
  }
});
module.exports = {
  Profile: Profile
};
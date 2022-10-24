"use strict";

// import escapeStringRegexp from 'escape-string-regexp';
var express = require('express');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId; // const escapeRegex = require('escape-string-regexp');


var _require = require('../models/profile'),
    Profile = _require.Profile; // => localhost:3000/profiles/


router.get('/', function (req, res) {
  Profile.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Profiles :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/profiles/_id

router.get('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Profile.findById(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Profiles :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // GetProfileByProfileName : FindLike

router.get('/GetProfileByProfileName/:profile_name', function (req, res) {
  var toFind = req.params.profile_name;
  var tofind_regex = new RegExp(toFind);
  var query = {
    profile_name: {
      $regex: tofind_regex,
      $options: 'i'
    }
  };
  Profile.find(query, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Profile :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/profiles/

router.post('/', function (req, res) {
  var profile = new Profile({
    created_at: null,
    updated_at: null,
    profile_name: req.body.profile_name
  });
  profile.save(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Profile Save :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/profiles/_id

router.put('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var profile = {
    created_at: null,
    updated_at: null,
    profile_name: req.body.profile_name
  };
  Profile.findByIdAndUpdate(req.params.id, {
    $set: profile
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Profile Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/profiles/_id

router["delete"]('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Profile.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Profile Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
});
module.exports = router;
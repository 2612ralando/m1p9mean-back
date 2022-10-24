"use strict";

// import escapeStringRegexp from 'escape-string-regexp';
var express = require('express');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId; // const escapeRegex = require('escape-string-regexp');


var _require = require('../models/restaurant'),
    Restaurant = _require.Restaurant; // => localhost:3000/restaurants/


router.get('/', function (req, res) {
  Restaurant.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Restaurants :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/restaurants/_id

router.get('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Restaurant.findById(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Restaurants :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // GetRestaurantByRestaurantName : FindLike

router.get('/GetRestaurantByRestaurantName/:restaurant_name', function (req, res) {
  var toFind = req.params.restaurant_name;
  var tofind_regex = new RegExp(toFind);
  var query = {
    restaurant_name: {
      $regex: tofind_regex,
      $options: 'i'
    }
  };
  Restaurant.find(query, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Restaurant :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/restaurants/  ----------SIMPLE SAVE RESTAURANT

router.post('/', function (req, res) {
  var restaurant = new Restaurant({
    created_at: null,
    updated_at: null,
    restaurant_name: req.body.restaurant_name,
    restaurant_location: req.body.restaurant_location,
    restaurant_phone: req.body.restaurant_phone,
    restaurant_email: req.body.restaurant_email,
    restaurant_password: req.body.restaurant_password,
    restaurant_logo: req.body.restaurant_logo
  });
  restaurant.save(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Restaurant Save :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/restaurants/  ----------SAVE RESTAURANT WITH B-CRYPT
// router.post('/', async (req, res) => {
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.restaurant_password, salt);
//     var restaurant = new Restaurant({
//         created_at: null,
//         updated_at: null,
//         restaurant_name: req.body.restaurant_name,
//         restaurant_location: req.body.restaurant_location,
//         restaurant_phone: req.body.restaurant_phone,
//         restaurant_email: req.body.restaurant_email,
//         restaurant_password: password,
//         restaurant_logo: req.body.restaurant_logo,
//     });
//     restaurant.save((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log('Error in Restaurant Save :' + JSON.stringify(err, undefined, 2)); }
//     });
// });
// => localhost:3000/restaurants/_id

router.put('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var restaurant = {
    created_at: null,
    updated_at: null,
    restaurant_name: req.body.restaurant_name,
    restaurant_location: req.body.restaurant_location,
    restaurant_phone: req.body.restaurant_phone,
    restaurant_email: req.body.restaurant_email,
    //optional
    restaurant_password: req.body.restaurant_password,
    //optional
    restaurant_logo: req.body.restaurant_logo
  };
  Restaurant.findByIdAndUpdate(req.params.id, {
    $set: restaurant
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Restaurant Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/restaurants/_id

router["delete"]('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Restaurant.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Restaurant Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // GetRestaurantByEmailAndPassword

router.get('/check_restaurant/:restaurant_email/restaurant/:restaurant_password', function (req, res) {
  var query = {
    "restaurant_email": req.params.restaurant_email,
    "restaurant_password": req.params.restaurant_password
  };
  Restaurant.find(query, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Restaurant :' + JSON.stringify(err, undefined, 2));
    }
  });
}); //CheckRestaurantPassword

router.post('/loginRestaurant', function _callee(req, res) {
  var query, restaurant, validPassword, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = {
            "restaurant_email": req.body.restaurant_email
          };
          console.log("VALID PASSWORD =" + query);
          _context.next = 4;
          return regeneratorRuntime.awrap(Restaurant.find(query));

        case 4:
          restaurant = _context.sent;

          if (!restaurant[0]) {
            _context.next = 12;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.restaurant_password, restaurant[0].restaurant_password));

        case 8:
          validPassword = _context.sent;

          if (validPassword) {
            token = jwt.sign({
              id: restaurant[0].id,
              restaurant_name: restaurant[0].restaurant_name,
              restaurant_email: restaurant[0].restaurant_email
            }, SECRET, {
              expiresIn: '23 hours'
            });
            res.status(200).json({
              accessToken: token
            });
          } else {
            res.status(400).json({
              authentified: false,
              error: "Invalid Password"
            });
          }

          _context.next = 13;
          break;

        case 12:
          res.status(401).json({
            error: "Restaurant does not exist"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;
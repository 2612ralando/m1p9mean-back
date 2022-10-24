"use strict";

var express = require('express');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var SECRET = 'ekalykey';

var _require = require('../models/deliverer'),
    Deliverer = _require.Deliverer; // => localhost:3000/deliverers/


router.get('/', function (req, res) {
  Deliverer.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Deliverers :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/deliverers/_id

router.get('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Deliverer.findById(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Deliverers :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/deliverers/ ---------- SIMPLE SAVE USER

router.post('/', function _callee(req, res) {
  var deliverer;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          deliverer = new Deliverer({
            created_at: null,
            updated_at: null,
            deliverer_name: req.body.deliverer_name,
            deliverer_email: req.body.deliverer_email,
            deliverer_phone: req.body.deliverer_phone,
            deliverer_password: req.body.deliverer_password,
            deliverer_disponibility: req.body.deliverer_disponibility
          });
          deliverer.save(function (err, docs) {
            if (!err) {
              res.send(docs);
            } else {
              console.log('Error in Deliverer Save :' + JSON.stringify(err, undefined, 2));
            }
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}); // => localhost:3000/deliverers/ ----------SAVE USER WITH B-CRYPT
// router.post('/', async (req, res) => {
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.password, salt);
//     var deliverer = new Deliverer({
//         created_at: null,
//         updated_at: null,
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: password,
//         id_profile: req.body.id_profile,
//     });
//     deliverer.save((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log('Error in Deliverer Save :' + JSON.stringify(err, undefined, 2)); }
//     });
// });
// => localhost:3000/deliverers/_id

router.put('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var deliverer = {
    created_at: null,
    updated_at: null,
    deliverer_name: req.body.deliverer_name,
    deliverer_email: req.body.deliverer_email,
    deliverer_phone: req.body.deliverer_phone,
    deliverer_password: req.body.deliverer_password,
    deliverer_disponibility: req.body.deliverer_disponibility
  };
  Deliverer.findByIdAndUpdate(req.params.id, {
    $set: deliverer
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Deliverer Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/deliverers/_id

router["delete"]('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  Deliverer.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Deliverer Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // GetDelivererByEmailAndPassword

router.get('/check_deliverer/:deliverer_email/deliverer/:deliverer_password', function (req, res) {
  var query = {
    "deliverer_email": req.params.deliverer_email,
    "deliverer_password": req.params.deliverer_password
  };
  Deliverer.find(query, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Deliverer :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // CheckDelivererPassword

router.post('/login', function _callee2(req, res) {
  var query, deliverer, validPassword, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = {
            "deliverer_email": req.body.deliverer_email
          };
          console.log("VALID PASSWORD =" + query);
          _context2.next = 4;
          return regeneratorRuntime.awrap(Deliverer.find(query));

        case 4:
          deliverer = _context2.sent;

          if (!deliverer[0]) {
            _context2.next = 12;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.deliverer_password, deliverer[0].deliverer_password));

        case 8:
          validPassword = _context2.sent;

          if (validPassword) {
            token = jwt.sign({
              id: deliverer[0].id,
              deliverer_name: deliverer[0].deliverer_name,
              deliverer_email: deliverer[0].deliverer_email
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

          _context2.next = 13;
          break;

        case 12:
          res.status(401).json({
            error: "Deliverer does not exist"
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;
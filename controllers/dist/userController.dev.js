"use strict";

var express = require('express');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var SECRET = 'ekalykey';

var _require = require('../models/user'),
    User = _require.User; // => localhost:3000/users/


router.get('/', function (req, res) {
  User.find(function (err, docs) {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/users/_id

router.get('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  User.findById(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/users/ ---------- SIMPLE SAVE USER

router.post('/', function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = new User({
            created_at: null,
            updated_at: null,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            id_profile: req.body.id_profile
          });
          user.save(function (err, docs) {
            if (!err) {
              res.send(docs);
            } else {
              console.log('Error in User Save :' + JSON.stringify(err, undefined, 2));
            }
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}); // => localhost:3000/users/ ----------SAVE USER WITH B-CRYPT
// router.post('/', async (req, res) => {
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash(req.body.password, salt);
//     var user = new User({
//         created_at: null,
//         updated_at: null,
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: password,
//         id_profile: req.body.id_profile,
//     });
//     user.save((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
//     });
// });
// => localhost:3000/users/_id

router.put('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  var user = {
    created_at: null,
    updated_at: null,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    id_profile: req.body.id_profile
  };
  User.findByIdAndUpdate(req.params.id, {
    $set: user
  }, {
    "new": true
  }, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in User Update :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // => localhost:3000/users/_id

router["delete"]('/:id', function (req, res) {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("No record with given id : ".concat(req.params.id));
  User.findByIdAndRemove(req.params.id, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // GetUserByEmailAndPassword

router.get('/check_user/:email/user/:password', function (req, res) {
  var query = {
    "email": req.params.email,
    "password": req.params.password
  };
  User.find(query, function (err, doc) {
    if (!err) {
      res.send(doc);
    } else {
      console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2));
    }
  });
}); // CheckUserPassword

router.post('/login', function _callee2(req, res) {
  var query, user, validPassword, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = {
            "email": req.body.email
          };
          console.log("query =" + query);
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.find(query));

        case 4:
          user = _context2.sent;

          if (!user[0]) {
            _context2.next = 12;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user[0].password));

        case 8:
          validPassword = _context2.sent;

          if (validPassword) {
            token = jwt.sign({
              id: user[0].id,
              name: user[0].name,
              email: user[0].email,
              id_profile: user[0].id_profile
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
            error: "User does not exist"
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;
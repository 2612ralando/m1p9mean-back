var express = require('express');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const SECRET = 'ekalykey';


var { User } = require('../models/user');

// => localhost:3000/users/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/users/_id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Users :' + JSON.stringify(err, undefined, 2)); }
    });

});

// => localhost:3000/users/ ---------- SIMPLE SAVE USER
router.post('/', async (req, res) => {
    var user = new User({
        created_at: null,
        updated_at: null,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        id_profile: req.body.id_profile,
    });

    user.save((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/users/ ----------SAVE USER WITH B-CRYPT
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
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var user = {
        created_at: null,
        updated_at: null,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        id_profile: req.body.id_profile,
    };

    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

// => localhost:3000/users/_id
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

// GetUserByEmailAndPassword
router.get('/check_user/:email/user/:password', (req, res) => {
    var query = { "email": req.params.email, "password": req.params.password };
    
    User.find(query, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
});

// CheckUserPassword
router.post('/login', async(req, res) => {
  var query = { "email": req.body.email };
  console.log("query =" + query);
  const user = await User.find(query);
    if (user[0]) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, user[0].password);
      if (validPassword) {
        const token = jwt.sign({
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          id_profile: user[0].id_profile,
      }, SECRET, { expiresIn: '23 hours' });

        res.status(200).json({
          accessToken: token
        });
      } else {
        res.status(400).json({ 
          authentified: false,
          error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }  
});

module.exports = router;
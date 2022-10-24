var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 2525,
    port: 465,
    secure: false,
    auth: {
        user: 'antenainarandrianantoandro@gmail.com',
        pass: 'randrianantoandro1080tad'
    }
});


router.post('/', (req, res) => {
    var message = {
        from: 'xxx', // Sender address
        to: 'seravola2019@gmail.com',         // List of recipients
        subject: 'Test objet | e-Kaly', // Subject line
        text: 'Ceci est un test d envoi email venant de l application e-kaly. Nous vous excusons de notre derangement. Merci de votre comprehension. Cordialement' // Plain text body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
});

module.exports = router;
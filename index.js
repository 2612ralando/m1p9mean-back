var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();

const { mongoose } = require('./dbConnect.js');
var restoController = require('./controllers/restoController.js');
var platController = require('./controllers/platController.js');




var app = express();
app.use(bodyParser.json());
// app.use(cors({ origin: "http://localhost:4200" })); //local
app.use(cors({ origin: "*" }));


// app.listen(5000, () => console.log('listening on port : 5000')); //local
app.listen(process.env.PORT, () => console.log(`listening on port : ${process.env.PORT}`));


// Router for userController into the application
app.use('/restos', restoController);

// Router for userController into the application
app.use('/plat', platController);



// Router for mailHelper into the application
// app.use('/sendMail', mailHelper);

// app.use(express.static(path.join(__dirname, 'public'))); //=> Upload Image
// app.use('/images', express.static('images')); //=> Upload Image

app.get('/', (req, res) => {
    res.send('Hello World');
});

var mongoose = require('mongoose');
// var connectionString = 'mongodb+srv://antenaina:itu@cluster0.nllkj.mongodb.net/e-kaly?retryWrites=true&w=majority';

var connectionString = 'mongodb+srv://Orlando:orlandoitu@ekaly.ishvlcn.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(connectionString, (err) => {
    if (!err)
        console.log('MongoDB Connection - OK');
    else
        console.log('MongoDB Connection failed : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;

var mongoose = require('mongoose');


const Schema = mongoose.Schema(
    {
        nama : String,
        kelas : String,
        nrp : Number,
        rumah : String,
    }
);

module.exports = mongoose.model('nama',Schema);
 

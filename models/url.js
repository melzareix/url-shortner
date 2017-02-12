const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

var conn = mongoose.createConnection('mongodb://localhost:27017/url-shortner');
autoIncrement.initialize(conn);

var urlSchema = mongoose.Schema({
    original : String,
    shortendId : Number,
    hitCount : Number
});

urlSchema.plugin(autoIncrement.plugin, {
    model : 'Url',
    field : 'shortendId',
    startAt : 1000,
    incrementBy : 1
});

var url = mongoose.model('Url', urlSchema);
module.exports = url;
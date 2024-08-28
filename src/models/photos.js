const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
});

module.exports = mongoose.model('photos', photoSchema)
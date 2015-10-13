'use strict';

var mongoose = require('mongoose');
var User = require('../user/user.model.js');

var ImageSchema = new mongoose.Schema({
    fileName: {
        type: String
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
});

module.exports = mongoose.model('Image', ImageSchema);
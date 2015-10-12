'use strict';

var bcrypt   = require('bcryptjs');
var mongoose = require('mongoose');

var SALT_WORK_FACTOR = 10;
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your name']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://raw.githubusercontent.com/martinmicunda/employee-scheduling-ui/master/src/images/anonymous.jpg?123456'
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});
'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var email = new Schema({
    name: String,
    matter: String,
    email: String,
    body: String
});
module.exports = mongoose.model('email', email);
    

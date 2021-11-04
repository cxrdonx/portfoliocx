'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var blog = Schema({
    title: String,
    content: String,
    image: String,  
    links:[String]
})
module.exports = mongoose.model("blog", blog);
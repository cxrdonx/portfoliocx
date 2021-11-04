'use strict'
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var projectsInfo = Schema({
     name: String,
     description: String,
     category: String,
     image: String,
     langs:[String]
 })

 module.exports = mongoose.model("Project", projectsInfo);
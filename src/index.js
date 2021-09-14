'use strict'
const mongoose = require('mongoose');
const app = require('../src/app.js');
const port = 3700;
mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost:27017/portfolio')
.then(()=>{
    console.log("conexion establecida");
    app.listen(port,()=>{
        console.log("servidor corriendo correctamente");
    });
})
   .catch(err => console.log(err));
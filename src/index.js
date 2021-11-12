'use strict'
const mongoose = require('mongoose');
const app = require('../src/app.js');
const port = 3700;
mongoose.promise = global.promise;
mongoose.connect('mongodb+srv://cardona:Umr3H2sjYw9dbWp@cluster0.7z3lp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{
    console.log("conexion establecida");
    app.listen(port,()=>{
        console.log("servidor corriendo correctamente");
    });
})
   .catch(err => console.log(err));

   
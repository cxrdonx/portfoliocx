const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/projectWebApp'));
app.get('/*', function(req,res) {
    console.log("servidor angular corriendo");
    res.sendFile(path.join(__dirname+'/dist/projectWebApp/index.html'));
});
console.log("servidor angular corriendo");
app.listen(process.env.PORT || 8080);

const express = require("express");
var proxy = require('express-http-proxy')


const app = express();
app.use(express.static("./dist/nfc-form"));

app.get("/*", function(req,res){
    res.sendFile("index.html", {root:"dist/project-name"});
})

app.use('https://clf-form.herokuapp.com/forms', proxy('https://docs.google.com/forms'))
app.use('/forms', proxy('https://docs.google.com/forms'))

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`);
const express = require("express");
const proxy = require('express-http-proxy')
const url = require('url')


const app = express();
app.use(express.static("./dist/nfc-form"));


app.get("/*", function(req,res){
    res.sendFile("index.html", {root:"dist/project-name"});
})

const apiProxy = proxy('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdkv02jQMeGMT3MaWtLPTK66Ze-VhiTXHn7RaxXuC69NbwNhg/formResponse',
{proxyReqPathResolver: req => url.parse(req.baseUrl).path});

const apiProxy2 = proxy('https://docs.google.com/forms/d/e/1FAIpQLSeaQBxI5CdzTkRnUARfmS02ByQywaCuYoFWtslUhpJbc7YUNg/formResponse',
{proxyReqPathResolver: req => url.parse(req.baseUrl).path});

app.use('https://clf-form.herokuapp.com/forms/u/*',apiProxy)
app.use('/forms/u/*',apiProxy)

app.use('https://clf-form.herokuapp.com/forms/d/*',apiProxy2)
app.use('/forms/d/*',apiProxy2)

//app.use('https://clf-form.herokuapp.com/forms', proxy('https://docs.google.com/forms'))
//app.use('/forms', proxy('https://docs.google.com/forms'))

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`);
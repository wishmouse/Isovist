var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var hbs = require('handlebars')
var request = require('superagent')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res){
  res.render('main')
})


app.post('/', function(req, res){
  var city = req.body.city
  request
    .get('api.openweathermap.org/data/2.5/weather?q='+ city + '&units=metric&APPID=79c83b2725f005cfeb5c9a00becfffc2')
    .set('Accept', 'application/json')
    .then(function(data){
    res.render('main',data.body)
  })
})


app.listen(3000, function(){
})

module.exports = app;

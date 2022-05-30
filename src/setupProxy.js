var express = require('express')
var cors = require('cors')
var app = express()
var port =9000;
app.use(cors())
app.options('*', cors()) 
 
app.get('/web-app/', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(port, function () {
  console.log('CORS-enabled web server listening on port '+port);
})
'use strict';
const PORT = 8001;
var http = require('http');
var moment = require('moment');
var md5 = require('md5');
var sf = require('./servFunctions');

var server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  var urlParts = req.url.match(/[^/]+/g);

  if (urlParts) {
    var path = urlParts.shift();
    switch (path) {
      case 'square':
        var num = parseInt(urlParts[0]);
        var square = Math.pow(num, 2);
        res.write(JSON.stringify(square));
        break;
      case 'sum':
        var sum = urlParts.reduce(function(sum, num) {
          return sum + parseInt(num);
        }, 0);
        res.write(JSON.stringify(sum));
        break;
      case 'sentence':
        var sentence = decodeURI(urlParts).toString();
        console.log(sentence);
        var counts = sf.superCounter(sentence);
        var result = JSON.stringify(counts);
        res.write(result);
        break;
      case 'email':
        var hash = md5(urlParts[0]);
        res.write('http://www.gravatar.com/avatar/' + hash);
        break;
      case 'date':
      console.log(urlParts[0]);
        var birthDate = sf.ageDate(urlParts[0]);
        res.write(birthDate);
      }
    }
  res.end();
});

server.listen(PORT, function(err) {
  console.log(`Server listening on port ${PORT}`);
});

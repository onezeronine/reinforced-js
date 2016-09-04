var fs = require('fs');
var express = require('express');
var app = express();

app.engine('html', function(filePath, options, cb) {
  fs.readFile(filePath, function(err, content) {
    if(err) { return cb(new Error(err)); }
    // this is an extremely simple template engine
    return cb(null, content.toString());
  });
});

app.set('views', './views');
app.set('view engine', 'html');

app.use(express.static('assets', {
  maxAge: '7d'
}));

app.get('/', function(req, res, next) {
  var model = { title: 'Checkers' };
  res.render('index', model);
});

var port = 3020;
app.listen(port, function() {
  console.log('Listening to ' + port);
});

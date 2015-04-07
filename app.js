var http = require('http'),
    fs = require('fs');

var app = http.createServer(function (req, res) {
    var file = req.url.substring(req.url.lastIndexOf('.'));

    if (req.url == '/gridworld') {
        fs.readFile('./gridworld.html', function (error, data) {
            if (error) {
                throw error;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    else if (file === ".js") {
        var ft = "." + req.url;
        fs.readFile(ft, function (error, data) {
            if (error) {
                throw error;
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        });
    }
    else if (file === ".css") {
        var ft = "." + req.url;
        fs.readFile(ft, function (error, data) {
            if (error) {
                throw error;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(data);
            res.end();
        });
    }
});

app.listen(1337);



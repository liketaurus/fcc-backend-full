var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('ui'));

app.use(bodyParser.json());
var port = 8080;

app.route('/')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/ui/index.html');
    });

app.get('/:query', function(req, res) {
    var date = parseInt(req.params.query);
    var unix = null;
    var natural = null;

    if (date >= 0) {
        unix = date;
        natural = unixToNat(unix);
    }

    if (moment(date, "MMMM D, YYYY").isValid()) {
        unix = natToUnix(date);
        natural = unixToNat(unix);
    }

    var dateObj = {
        "unix": unix,
        "natural": natural
    };
    res.send(dateObj);

});

function natToUnix(date) {
    return moment(date, "MMMM D, YYYY").format("X");
}

function unixToNat(unix) {
    return moment.unix(unix).format("MMMM D, YYYY");
}




app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});
var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var favicon = require('express-favicon');

app.use(express.json());
app.use(express.urlencoded())
app.use(favicon(__dirname + '/img/favicon.png'));


var db = new sqlite3.Database('./hireme.db', (err) => {
    // open the db
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
console.log(db);

// close the db
function closeDB() {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

// js file is included here:
var fs = require('fs');
eval(fs.readFileSync('./pages/index.js') + '');
// eval(fs.readFileSync('./pages/html.js') + '');
// eval(fs.readFileSync('./pages/css.js') + '');
eval(fs.readFileSync('./pages/javascript.js') + '');


// HTML stuff here
app.get('/quiz/html', function(req, res) {
    var html = require('./pages/html.js');

    res.render('html', {
        "htmlData": html,
    });
})
// CSS stuff here
app.get('/quiz/css', function(req, res) {
    var css = require('./pages/css.js');

    res.render('css', {
        "cssData": css,
    });
})
// Javascript stuff here
app.get('/quiz/JS', function(req, res) {
    var javascript = require('./pages/javascript.js');

    res.render('javascript', {
        "javascriptData": javascript,
    });
})


var path = require('path');
// views is where we store the templates
app.set('views', process.cwd() + '/views')
// view engine is the decription for software, renders html
app.set('view engine', 'pug')
app.use("/img", express.static(path.join(__dirname, 'img')));



app.post('/result', function(req, res) {
    var body = req.body;
    res.render('result', {
      "body": body,
    });
})

var listOfHtmlQuestions = {}
var listOfCssQuestions = {}
var listOfJsQuestions = {}

var server = app.listen(process.env.PORT || 8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

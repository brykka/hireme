var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var favicon = require('express-favicon');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

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

app.post('/quiz/html', jsonParser, function(req, res) {
    var body = req.body;
    console.log(body);
    var databaseInfo = require('./pages/html.js');
    var rateOfCorrect = 0;
    for (const [id, databaseEntry] of Object.entries(databaseInfo)) {
      for (const [question, submittedAnswer] of Object.entries(body)) {
        if (databaseEntry.question == question) {
          if (databaseEntry.correct == submittedAnswer) {
            rateOfCorrect++;
          }
        }
      }
    }
    var percentageCorrect = (rateOfCorrect / Object.keys(body).length) * 100;
    res.render('result', {
      "body": body,
      "percentageCorrect": percentageCorrect
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


var server = app.listen(process.env.PORT || 8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var favicon = require('express-favicon');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(express.json());
app.use(express.urlencoded())
app.use(favicon(__dirname + '/img/favicon.png'));

function feedback(percentageCorrect) {
  if (percentageCorrect === 100) {
      return `you get ${percentageCorrect}%, you are incredible!`
    } else if (percentageCorrect >= 80 && percentageCorrect <= 99) {
      return `you get ${percentageCorrect}%, incredible!`
    } else if  (percentageCorrect >= 70 && percentageCorrect <= 79){
      return `you get ${percentageCorrect}%, oooh maybe study more!`
    } else if (percentageCorrect >= 50 && percentageCorrect <= 69) {
      return `you get ${percentageCorrect}%, oooh maybe study more!`
    } else {
      return `You get ${percentageCorrect}%, oh no`
    }
}

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


// HTML stuff here
var html = require('./pages/html.js');
app.get('/quiz/html', function(req, res) {
  var html = require('./pages/html.js');
    res.render('html', {
        "htmlData": html,
    });
})

app.post('/quiz/html', jsonParser, function(req, res) {
    var body = req.body;
    var databaseInfo = require('./pages/html.js');
    var rateOfCorrect = 0;
    var responseBody = {};

    for (const [id, databaseEntry] of Object.entries(databaseInfo)) {
      for (const [question, submittedAnswer] of Object.entries(body)) {
        if (databaseEntry.question == question) {
          responseBody[question] = {};
          responseBody[question]['submitted'] = submittedAnswer;
          responseBody[question]['correct'] = databaseEntry.correct;
          if (databaseEntry.correct == submittedAnswer) {
            rateOfCorrect++;
            responseBody[question]['class'] = 'correct';
          } else {
            responseBody[question]['class'] = 'incorrect';
          }
        }
      }
    }

    if (rateOfCorrect === 0) {
      var percentageCorrect = 0;
    } else {
      var percentageCorrect = (rateOfCorrect / Object.keys(body).length) * 100;
    }

      var feedbackMessage = feedback(percentageCorrect);

    res.render('result', {
      "feedbackMessage": feedbackMessage,
      "responseBody": responseBody
    });
})

// CSS stuff here
var css = require('./pages/css.js');
app.get('/quiz/css', function(req, res) {
    var css = require('./pages/css.js');

    res.render('css', {
        "cssData": css,
    });
})

app.post('/quiz/css', jsonParser, function(req, res) {
    var body = req.body;
    var databaseInfo = require('./pages/css.js');
    var rateOfCorrect = 0;
    var responseBody = {};

    for (const [id, databaseEntry] of Object.entries(databaseInfo)) {
      for (const [question, submittedAnswer] of Object.entries(body)) {
        if (databaseEntry.question == question) {
          responseBody[question] = {};
          responseBody[question]['submitted'] = submittedAnswer;
          responseBody[question]['correct'] = databaseEntry.correct;
          if (databaseEntry.correct == submittedAnswer) {
            rateOfCorrect++;
            responseBody[question]['class'] = 'correct';
          } else {
            responseBody[question]['class'] = 'incorrect';
          }
        }
      }
    }

    if (rateOfCorrect === 0) {
      var percentageCorrect = 0;
    } else {
      var percentageCorrect = (rateOfCorrect / Object.keys(body).length) * 100;
    }

    var feedbackMessage = feedback(percentageCorrect);

    res.render('result', {
      "feedbackMessage": feedbackMessage,
      "responseBody": responseBody
    });
})

// Javascript stuff here
var javascript = require('./pages/javascript.js');
app.get('/quiz/JS', function(req, res) {
    var javascript = require('./pages/javascript.js');

    res.render('javascript', {
        "javascriptData": javascript,
    });
})

app.post('/quiz/JS', jsonParser, function(req, res) {
    var body = req.body;
    var databaseInfo = require('./pages/javascript.js');
    var rateOfCorrect = 0;
    var responseBody = {};

    for (const [id, databaseEntry] of Object.entries(databaseInfo)) {
      for (const [question, submittedAnswer] of Object.entries(body)) {
        if (databaseEntry.question == question) {
          responseBody[question] = {};
          responseBody[question]['submitted'] = submittedAnswer;
          responseBody[question]['correct'] = databaseEntry.correct;
          if (databaseEntry.correct == submittedAnswer) {
            rateOfCorrect++;
            responseBody[question]['class'] = 'correct';
          } else {
            responseBody[question]['class'] = 'incorrect';
          }
        }
      }
    }

    if (rateOfCorrect === 0) {
      var percentageCorrect = 0;
    } else {
      var percentageCorrect = (rateOfCorrect / Object.keys(body).length) * 100;
    }

    var feedbackMessage = feedback(percentageCorrect);

    res.render('result', {
      "feedbackMessage": feedbackMessage,
      "responseBody": responseBody
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

var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();

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




// When we reference local (on your computer) files there are two ways we can do
// it, absolute and relative. If we are using absolute values it might looks
// something like:
//   /Users/myname/git-projects/hireme/img/
//
// Other people might set their computers up a little differently though. For
// them, they may be saving hireme in a different place:
//   /home/yourname/coding-stuff/hireme/img/
//
// These are examples of absolute paths. What we are doing here is importing a
// library called 'path' that allows us to use relative places. For example
//   ./img
//   ./components
//   ./css
//
// Using a . at the begining of a relative path means 'the directory that this
// file (main.js) is saved to.' It doesn't matter where the other people you are
// working with have saved it. The program will figure out the details on its
// own.
var path = require('path');
// views is where we store the templates
app.set('views', process.cwd() + '/views')
// view engine is the decription for software, renders html
app.set('view engine', 'pug')

// This next line looks scary. Let's break it down so we know what's happening.
//   app.use = Setting an attribute for the app/project/website/whatever you want to call it.
//   "/img"  = The web address ending that we will use to access the files once the program is running
//   express.static = Express is the framework we are using. This is telling it we want to use static assets (images)
//   path = This is referencing a path on your computer. It comes from the library we imported on line 9
//   join = Now we are telling the 'path' library that we are going to supply it with two names and that they should be combined
//   __dirname = This is the place where the hireme directory is saved on your computer.
//       It may be different for different people but this will make sure the program knows where to look
//   'img' = This is the directory inside hireme where you are saving your images.
//
// Basically all this line is doing is saying 'look at all the files in the
// img directory and make sure they are accessible from my.domain.com/img.'
// Examples for this project:
//   my.domain.com/img/css3.png
//   my.domain.com/img/html5.png
//   my.domain.com/img/javascript.png
//
// We want relative paths but, as an example, this is what this line would be
// written like if we were using absolute paths:
//   app.use("/img", express.static('/Users/myname/git-projects/hireme/img'));
app.use("/img", express.static(path.join(__dirname, 'img')));


app.get('/result', function(req, res) {
    // body...
    res.render('result', {})
})

var listOfHtmlQuestions = {}
var listOfCssQuestions = {}
var listOfJsQuestions = {}

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

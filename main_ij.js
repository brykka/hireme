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

app.get('/indextest', function (req, res) { // req = incoming request, res = outgoing response
  var quizzes = ['HTML', 'CSS', 'JS']
  var story = 'We met at a coding meetup in October and decied to get together to work on this project to practice working on front end development in a team.'

  var person1 = 'Ijen'
  var person2 = 'Mimi'
  var person3 = 'Bryenne'
  var person1Image = 'https://github.com/theyij.png?size=200.src'
  var person2Image = 'https://github.com/Miimii1010.png?size=200'
  var person3Image = 'https://avatars1.githubusercontent.com/u/47349194?s=460&v=4'
  var linkedin = 'https://image.flaticon.com/icons/svg/1384/1384014.svg'
  var github = 'https://image.flaticon.com/icons/svg/25/25231.svg'
  var website = 'https://image.flaticon.com/icons/svg/1242/1242392.svg'

  res.render('index', { // res = outgoing response
    icon: {
    	linkedin: linkedin,
    	github: github,
    	site: website
    },
    listOfQuizzes: quizzes,
    body: story,
    person1: {
    	name: person1,
    	bio: "Currently looking for new challenges and opportunities to contribute in Front-End web-development. ",
    	avatar: person1Image,
    	linkedin: "https://www.linkedin.com/in/yangijen/",
    	github:"https://github.com/theyij",
    	website:"https://yijen.netlify.com"
    },
    person2: {
    	name: person2,
    	bio: "This is a little bit of info about me. Here is my history, current and future projects. This is what I am intereseted in.",
    	avatar: person2Image,
    	linkedin: "https://www.linkedin.com/",
    	github:"https://github.com/Miimii1010",
    	website:"https://codepen.io/"
    },
    person3: {
    	name: person3,
    	bio: "This is a little bit of info about me. Here is my history, current and future projects. This is what I am intereseted in.",
    	avatar: person3Image,
    	linkedin: "https://www.linkedin.com/",
    	github:"https://github.com/brykka",
    	website:"https://codepen.io/"
    }
  })
})


// A smaller version I was working on (ij)
app.get('/quiz/html', function (req, res) {

    var sql = `SELECT question FROM html`;
    var selected = 1;
    // var something = [];
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        var something = v.createHash([algorith-to-be-used])

        // something[row.answer1] = row;
        console.log("===set===");
        console.log(row.question);
      });
    });

      db.close();
});




app.get('/quiz/css', function (req, res) { // req = incoming request, res = outgoing response
  var quizzes = ['HTML', 'CSS', 'JS']
  res.render('css', { // res = outgoing response
    listOfQuizzes: quizzes
  })
})

app.get('/quiz/js', function (req, res) { // req = incoming request, res = outgoing response
  var quizzes = ['HTML', 'CSS', 'JS']
  // SELECT fr database put
  // var databsinfo = SELECT FROM db
  res.render('js', { // res = outgoing response
    // this is the sendy part
    // dbinfo: databsinfo
    listOfQuizzes: quizzes
  })
})

app.get('/result', function (req, res) {
  // body...
  res.render('result', {
  })
})

var listOfHtmlQuestions = {}
var listOfCssQuestions = {}
var listOfJsQuestions = {}

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
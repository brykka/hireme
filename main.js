var express = require('express');
var app = express();

// views is where we store the templates
app.set('views', process.cwd() + '/views')
// view engine is the decription for software, renders html
app.set('view engine', 'pug')


app.get('/indextest', function (req, res) { // req = incoming request, res = outgoing response
  var quizzes = ['HTML', 'CSS', 'JS']
  res.render('index', { // res = outgoing response
    listOfQuizzes: quizzes
  })
})

app.get('/quiz/html', function (req, res) { // req = incoming request, res = outgoing response
  var quizzes = ['HTML', 'CSS', 'JS']
  res.render('html', { // res = outgoing response
    listOfQuizzes: quizzes
  })
})

app.get('/quiz/css', function (req, res) { // req = incoming request, res = outgoing response
  var quizzes = ['HTML', 'CSS', 'JS']
  res.render('css', { // res = outgoing response
    listOfQuizzes: quizzes
  })
})

app.get('/quiz/js', function (req, res) { // req = incoming request, res = outgoing response
  var quizzes = ['HTML', 'CSS', 'JS']
  res.render('js', { // res = outgoing response
    listOfQuizzes: quizzes
  })
})

app.get('/result', function (req, res) { // req = incoming request, res = outgoing response
  const story = 'this is the fake result page, lol'
  res.render('result', { // res = outgoing response
  })
})

app.get('/about', function (req, res) { // req = incoming request, res = outgoing response
  const story = 'this is how we met and this is what we are working on blah blabaldada a a haonlaksncla talk about us blah'
  const person1 = "yijen"
  const person2 = "mimi"
  const person3 = "bryenne"

  res.render('about', { // res = outgoing response
    body: story,
    person2: {name: person2, bio: "okokok", contact: "linkdin"},
    person1: {name: person1, bio: 'yeesyyesys', contact: "gmail"},
    person3: {name: person3, bio: "blablabla", contact: "twitter"}
  })
})






// app.post('/quiz/html', function (req, res) {
//   res.render('htmlResponse', {
//     listOfHtmlQuestions
//     listofCorrectHtmlAnswers
//     listOfSuppliedHtmlAnswers
//     correctPercentage
//   })
// })

// app.post('/quiz/css', function (req, res) {
//   res.render('cssResponse', {
//     listOfCssQuestions
//     listofCorrectCssAnswers
//     listOfSuppliedCssAnswers
//     correctPercentage
//   })
// })

// app.post('/quiz/js', function (req, res) {
//   res.render('jsResponse', {
//     listOfJsQuestions
//     listofCorrectJsAnswers
//     listOfSuppliedJsAnswers
//     correctPercentage
//   })
// })

var listOfHtmlQuestions = {}
var listOfCssQuestions = {}
var listOfJsQuestions = {}

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

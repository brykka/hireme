var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hireme.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('CSS: Connected to the in-memory SQlite database.');
});

var questionData = {};
db.all('SELECT * FROM css', function(err, rows) {
  rows.forEach((row) => {

    questionData[row.question] = {
      "question": row.question,
      "answer1": row.ans1,
      "answer2": row.ans2,
      "answer3": row.ans3,
      "answer4": row.ans4,
      "correct_answer": row.correctAns
    }
  })
});

db.close();
module.exports = questionData;





// app.get('/quiz/css', function(req, res) { // req = incoming request, res = outgoing response
//
//     // Nick's code here, for comment go to css_old
//     var sqlite3 = require('sqlite3').verbose();
//     var db = new sqlite3.Database('./hireme.db', (err) => {
//       if (err) {
//         return console.error(err.message);
//       }
//       console.log('CSS: Connected to the in-memory SQlite database.');
//     });
//
//     var questionData = {}
//     db.all('SELECT * FROM css', function(err, rows) {
//         rows.forEach((row) => {
//
//             questionData[row.question] = {
//
//                 "question": row.question,
//                 "answer1": row.ans1,
//                 "answer2": row.ans2,
//                 "answer3": row.ans3,
//                 "answer4": row.ans4,
//                 "correct_answer": row.correctAns
//             }
//         })
//     });
//     db.close();
//     module.exports = questionData
//
//
//     // Importing the backend code for the css page.
//     // Use this format to break main.js down into more manageable parts.
//     // The "var css" bit is what we will send to the pug template
//     // var css = require('./pages/css_old.js');
//     var css = questionData;
//     // Send (aka render) the page with the 'css' pug template.
//     res.render('css', { // res = outgoing response
//         // cssData is the variable we will use in the pug template
//         // css is the variable from line 164
//         "cssData": css,
//
//     });
// });

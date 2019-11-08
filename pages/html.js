var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hireme.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('HTML: Connected to the in-memory SQlite database.');
});

var questionData = {};
db.all('SELECT * FROM html', function(err, rows) {
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



// app.get('/quiz/html', function(req, res) { // req = incoming request, res = outgoing response
//     var htmlDB = `SELECT question FROM html`;
//     var hData = db.all(htmlDB, [], (err, rows) => {
//
//         if (err) {
//             throw err;
//         }
//
//         // new hash
//
//         rows.forEach((row) => {
//             // hash += row
//             console.log(row);
//         });
//         for (var i = 0; i < rows.length; i++) {
//
//             // Create an object to save current row's data
//             var html = {
//                 'question': rows[i].question,
//                 'answer1': rows[i].answer1,
//                 'answer2': rows[i].answer2,
//                 'answer3': rows[i].answer3,
//                 'answer4': rows[i].answer4,
//                 'correctanswer': rows[i].correctAnswer
//             }
//         }
//     });
//     closeDB();
//     console.log(typeof hData);
//
//     var quizzes = ['HTML', 'CSS', 'JS']
//     res.render('html', { // res = outgoing response
//         htmlQuestions: hData,
//         listOfQuizzes: quizzes
//     })
// })

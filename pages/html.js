var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hireme.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('HTML: Connected to the in-memory SQlite database.');
});

var questionData = {};
db.all('SELECT question FROM html ORDER BY RANDOM() LIMIT 5;', function(err, questions) {
  var counterQuestion = 1;

  questions.forEach((question) => {
    var question = question.question;
    questionData[question.toString()] = {};
    questionData[question]['id'] = counterQuestion;
    questionData[question]['question'] = question;


    db.get(`SELECT ans1, ans2, ans3, ans4 FROM html WHERE question == '${question}';`, function(err, answers) {
      console.log(answers);
      if (err) {
        return console.error(err.message);
      }
        var counterAnswer = 1;
        answers[Math.floor(Math.random() * answers.length)].forEach((answer) => {
          console.log('answer');
          console.log(answer);
          var colName = 'ans'.concat(counterAnswer);
            questionData[question]['answer'.concat(counterAnswer)] = answer.colName;
            counterAnswer++;
        })
    })

    // questionData[row.question] = {
    //   "id": counter,
    //   "question": row.question,
    //   "answer1": row.ans1,
    //   "answer2": row.ans2,
    //   "answer3": row.ans3,
    //   "answer4": row.ans4,
    //   "correct_answer": row.correctAns
    // }
    counterQuestion++
  })
  console.log(questionData);
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

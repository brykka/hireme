var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hireme.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('CSS: Connected to the in-memory SQlite database.');
});

var questionData = {};
db.all('SELECT rowid, * FROM css', function(err, rows) {
  rows.forEach((row) => {

    questionData[row.question] = {
      "id": row.rowid,
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

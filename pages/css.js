var sqlite3 = require('sqlite3').verbose();

// open the db
var db = new sqlite3.Database('./hireme.db', (err) => {
  // Tell us if there was an error opening the database
  if (err) {
    return console.error(err.message);
  }
  // If no errors, show everything is ok message
  console.log('CSS: Connected to the in-memory SQlite database.');
});

// This creates a new, empty hash/dictionary object
// When we query the information in the database, we are going to put 
// everything we find in the database in here. The reason we put it into this 
// variable is because it is something that pug can easily manipulate.
var questionData = {}

// Query (aka SELECT) the data from the database.
// I created a new table called "new_css" mostly just so that we could have column
// names that don't contain any spaces.
db.all('SELECT * FROM new_css', function(err, rows) {
  // For each row that is returned from that SELECT we will ...
  rows.forEach((row) => {
    // ... create a new entry into the questionData hash/dictionary.
    // I am using the [row.id] in line 27 mostly just as a counter
    questionData[row.id] = {
      // All of the ".whatever" bits in these lines are the column titles in the new_css table
      "id": row.id,
      "question": row.question,
      "answer1": row.answer1,
      "answer2": row.answer2,
      "answer3": row.answer3,
      "answer4": row.answer4,
      "correct_answer": row.correct_answer
    }
  })
});

// Basically when this .forEach loop is finished your questionData variable will look like this:
//
// questionData = {
//   "1": {
//     "id": "1",
//     "question": "Who is not in the study group",
//     "answer1": "Bryenne",
//     "answer2": "Mimi",
//     "answer3": "IJen",
//     "answer4": "Stark",
//     "correct_answer": "Stark"
//   },
//   "2": {
//     "id": "2",
//     "question": "Example question 2",
//     "answer1": "Example answer 1",
//     "answer2": "Example answer 2",
//     "answer3": "Example answer 3",
//     "answer4": "Example answer 4",
//     "correct_answer": "Example answer 2"
//   },
//   "3": {
//     "id": "3",
//     "question": "Another example question 3",
//     "answer1": "Another example answer 1",
//     "answer2": "Another example answer 2",
//     "answer3": "Another example answer 3",
//     "answer4": "Another example answer 4",
//     "correct_answer": "Another example answer 1"
//   }
// }


// We have no more use for this database at the moment so we will close the connection
db.close();

// This is the bit that allows us to treat this like a module/library. We will 
// send the questionData variable that we built to whatever other script asks
// for it (main.js in this case).
// To "ask for" this data in main.js we can do one of these (line 164 in main.js):
//   var css = require('./pages/css.js')
module.exports = questionData

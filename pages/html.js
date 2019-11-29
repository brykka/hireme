var sqlite3 = require('sqlite3').verbose();
// Start the database connection and create the 'db' object
var db = new sqlite3.Database('./hireme.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('HTML: Connected to the in-memory SQlite database.');
});

var questionData = {};

db.all('SELECT * FROM html ORDER BY RANDOM() LIMIT 5;', function(err, questions) {

  var counter = 1;
  questions.forEach((question) => {
    var answers = [question.ans1, question.ans2, question.ans3,
    question.ans4];

    // Create the first entry in our dictionary/hash.
    questionData[counter] = {};
    // Add an 'id' field to our question data. We match this to 'counter'
    // because this is the field that will be used in our pug template.
    questionData[counter]['id'] = counter;
    // Add the question key with value.
    questionData[counter]['question'] = question.question;
    // Here we are adding the answers key. The value (shuffle(answers)) is an
    // array/list. We just need to keep this in mind when we are working with
    // our pug file. It may change the way we loop over the data in pug.
    questionData[counter]['answers'] = shuffle(answers);
    questionData[counter]['correct'] = question.correctAns;

    // Lastly, we increment the counter by 1 so the next entry in the
    // questionData dictionary is unique.
    counter++
  });
});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getNum(val) {
    if (isNaN(val)) {
      return 0;
  }
  return val;
}


// Always close the db
db.close();

// Return the questionData dictionary for pug to parse through.
module.exports = questionData;

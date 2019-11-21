// Import sqlite library
var sqlite3 = require('sqlite3').verbose();
// Start the database connection and create the 'db' object
var db = new sqlite3.Database('./hireme.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('HTML: Connected to the in-memory SQlite database.');
});

// Create an empty dictionary/hash. This is where we will store our question
// data once we pull it out of the database.
var questionData = {};
db.all('SELECT * FROM html ORDER BY RANDOM() LIMIT 5;', function(err, questions) {
  // Create a counter. We will use this to ensure the question number is
  // consistent. When SELECTing with RANDOM() in the database the line
  // numbers are not sequential so we have to do this.
  var counter = 1;

  // Loop over each line (question) that we found in the database
  questions.forEach((question) => {
    // Add all of the answer columns to an array/list. I am doing this
    // because I found a function to shuffle items in a list and it's pretty
    // straight forward. We will do that in a little bit.
    var answers = [question.ans1, question.ans2, question.ans3,
question.ans4];

    // Create the first entry in our dictionary/hash. This first key is just
    // the identifier for our questions. We assign it to a new, empty
    // dictionary/hash so that we can put our actual question data into a
    // more organized structure. I'll show the final structure at the end of
    // this doc so it's more easy to visualize.
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

    // Lastly, we increment the counter by 1 so the next entry in the
    // questionData dictionary is unique.
    counter++
  });
});

// I found this function on StackOverflow. I don't exactly understand what is
// happening here but it works so I'm not asking too many questions.
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

// Always close the db
db.close();
// Return the questionData dictionary for pug to parse through.
module.exports = questionData;

const quizContainer = document.getElementById('qCard');
const resultsContainer = document.getElementById('result');
const submitButton = document.getElementById('submitButton');


function buildQuiz(){}

function showResults(){}

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);




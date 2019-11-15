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

// Select all columns from the database in random order
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


//////
// This is the final structure of questionData. This is the long-hand way of
// writing what we did from lines 22-31. I'll show it in two different
// formats just so you can see the differences from a code perspective vs a
// conceptual structure.
//////
//
//   var questionData = {}; // Define variable. The variable is a dictionary in this case.
//   questionData["1"] = {}; // dictionary
//   questionData["1"]["id"] = "1";  // string
//   questionData["1"]["question"] = "How can you make a numbered list?";  // string
//   questionData["1"]["answers"] = [  // list
//     "<nl>",
//     "<numlist>",
//     "<ol>",
//     "<ul>"
//   ];
//   questionData["2"] = {}; // dictionary
//   questionData["2"]["id"] = "2";  // string
//   questionData["2"]["question"] = "How should you open a link on a new tab or window?";  // string
//   questionData["2"]["answers"] = [  // list
//     "<a href='url' target='_blank'>",
//     "<a href='url' target='new'>",
//     "<a href='url' new>",
//     "<a open='url'>"
//   ];
//   questionData["3"] = {}; // dictionary
//   questionData["3"]["id"] = "3";  // string
//   questionData["3"]["question"] = "What does HTML stand for?";  // string
//   questionData["3"]["answers"] = [  // list
//     "Hyper Text Markup Language",
//     "Hot Tacos Makeup Language",
//     "Hot Text Makeup Language",
//     "Hyper Tacos Markup Language"
//   ];
//   questionData["4"] = {}; // dictionary
//   questionData["4"]["id"] = "4";  // string
//   questionData["4"]["question"] = "What is the right element to emphasize text?";  // string
//   questionData["4"]["answers"] = [  // list
//     "<beautify-pls>",
//     "<em>",
//     "<italic>",
//     "<i>"
//   ];
//   questionData["5"] = {}; // dictionary
//   questionData["5"]["id"] = "5";  // string
//   questionData["5"]["question"] = "Which is the largest HTML heading element?";  // string
//   questionData["5"]["answers"] = [  // list
//     "<heading>",
//     "<h1>",
//     "<head>",
//     "<h6>"
//   ];
//
//////
// This is a more readable format of the same example data in questionData.
// This is JSON format. It's what the above example code is turned into when
// the javascript code is run. It's easy to read but you generally wouldn't
// write code like this manually.
//////
//
// {
//   "1": {
//     id: 1,
//     question: "How can you make a numbered list?",
//     answers: [
//       "<nl>",
//       "<numlist>",
//       "<ol>",
//       "<ul>"
//     ]
//   },
//   "2": {
//     id: 2,
//     question: "How should you open a link on a new tab or window?",
//     answers: [
//       "<a href='url' target='_blank'>",
//       "<a href='url' target='new'>",
//       "<a href='url' new>",
//       "<a open='url'>"
//     ]
//   },
//   "3": {
//     id: 3,
//     question: "What does HTML stand for?",
//     answers: [
//       "Hyper Text Markup Language",
//       "Hot Tacos Makeup Language",
//       "Hot Text Makeup Language",
//       "Hyper Tacos Markup Language"
//     ]
//   },
//   "4": {
//     id: 4,
//     question: "What is the right element to emphasize text?",
//     answers: [
//       "<beautify-pls>",
//       "<em>",
//       "<italic>",
//       "<i>"
//     ]
//   },
//   "5": {
//     id: 5,
//     question: "Which is the largest HTML heading element?",
//     answers: [
//       "<heading>",
//       "<h1>",
//       "<head>",
//       "<h6>"
//     ]
//   }
// }
//

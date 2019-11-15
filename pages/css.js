var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./hireme.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('CSS: Connected to the in-memory SQlite database.');
});

var questionData = {};
db.all('SELECT * FROM css ORDER BY RANDOM() LIMIT 5;', function(err, questions) {
    var counter = 1;
    questions.forEach((question) => {
        var answers = [
            question.ans1,
            question.ans2,
            question.ans3,
            question.ans4
        ];
        questionData[counter] = {};
        questionData[counter]['id'] = counter;
        questionData[counter]['question'] = question.question;
        questionData[counter]['answers'] = shuffle(answers);
        counter++;
    });
});

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
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
db.close();
module.exports = questionData;

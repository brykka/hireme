app.get('/quiz/css', function(req, res) { // req = incoming request, res = outgoing response

// Nick's code here, for comment go to css_old
    var questionData = {}
        db.all('SELECT * FROM new_css', function(err, rows) {
            rows.forEach((row) => {
                questionData[row.id] = {
                    "id": row.id,
                    "question": row.question,
                    "answer1": row.answer1,
                    "answer2": row.answer2,
                    "answer3": row.answer3,
                    "answer4": row.answer4,
                    "correct_answer": row.correct_answer
                };
            });
        });
    db.close();
    module.exports = questionData


    // Importing the backend code for the css page.
    // Use this format to break main.js down into more manageable parts.
    // The "var css" bit is what we will send to the pug template
    // var css = require('./pages/css_old.js');
    var css = questionData;
    // Send (aka render) the page with the 'css' pug template.
    res.render('css', { // res = outgoing response
        // cssData is the variable we will use in the pug template
        // css is the variable from line 164
        "cssData": css,
        // cssData: css,

    });
})

app.get('/quiz/js', function(req, res) { // req = incoming request, res = outgoing response
    var quizzes = ['HTML', 'CSS', 'JS']
    // SELECT fr database put
    // var databsinfo = SELECT FROM db
    res.render('js', { // res = outgoing response
        // this is the sendy part
        // dbinfo: databsinfo
        listOfQuizzes: quizzes
    })
})

app.get('/quiz/css', function(req, res) { // req = incoming request, res = outgoing response
    // Importing the backend code for the css page.
    // Use this format to break main.js down into more manageable parts.
    // The "var css" bit is what we will send to the pug template
    var css = require('./pages/css.js');
    // Send (aka render) the page with the 'css' pug template.
    res.render('css', { // res = outgoing response
        // cssData is the variable we will use in the pug template
        // css is the variable from line 164
        "cssData": css
    });
})

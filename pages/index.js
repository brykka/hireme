app.get('/', function(req, res) { // req = incoming request, res = outgoing response
    var quizzes = ['HTML', 'CSS', 'JS']
    var story = 'We met at a coding meetup in October and decied to get together to work on this project to practice working on front end development in a team.'

    var person1 = 'Ijen'
    var person2 = 'Bryenne'
    var person1Image = 'https://github.com/theyij.png?size=200.src'
    var person2Image = 'https://github.com/Miimii1010.png?size=200'
    var person3Image = 'https://avatars1.githubusercontent.com/u/47349194?s=460&v=4'
    var linkedin = 'https://image.flaticon.com/icons/svg/1384/1384014.svg'
    var github = 'https://image.flaticon.com/icons/svg/25/25231.svg'
    var website = 'https://image.flaticon.com/icons/svg/1242/1242392.svg'

    res.render('index', { // res = outgoing response
        icon: {
            linkedin: linkedin,
            github: github,
            site: website
        },
        listOfQuizzes: quizzes,
        body: story,
        person1: {
            name: person1,
            bio: "Taiwanese Front-End Developer located in Tokyo. Enjoy the process of problem solving and challenging different technology.",
            avatar: person1Image,
            linkedin: "https://www.linkedin.com/in/yangijen/",
            github: "https://github.com/theyij",
            website: "https://yijen.netlify.com"
        },
        person2: {
            name: person2,
            bio: "Continuously looking to imporve and expand my knowledge with interesting new projects.",
            avatar: person3Image,
            linkedin: "https://www.linkedin.com/in/bryenne-kay/",
            github: "https://github.com/brykka",
            website: "https://bryennekay.com"
        }
    })
})

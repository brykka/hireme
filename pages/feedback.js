function feedback {
  if (${percentageCorrect} === 100) {
      h2=`you get ${percentageCorrect}%, you are incredible!`
    } else if (${percentageCorrect} >= 80 && ${percentageCorrect} <= 99) {
      h2=`you get ${percentageCorrect}%, incredible!`
    } else if  (${percentageCorrect >= 70 && ${percentageCorrect} <= 79){
      h2=`you get ${percentageCorrect}%, oooh maybe study more!`
    } else if (${percentageCorrect} >= 50 && ${percentageCorrect} <= 69) {
      h2=`you get ${percentageCorrect}%, oooh maybe study more!`
    } else {
      h2=`You get ${percentageCorrect}%, oh no`
    }
}

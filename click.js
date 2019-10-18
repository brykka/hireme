var answer = document.querySelector("p");
var changeColor = false;

answer.addEventListener("click", function(){
	if(changeColor){
		document.body.style.background = "white";
	}else{
		document.body.style.background = "#DCB879";
	}
	changeColor = !changeColor;
})
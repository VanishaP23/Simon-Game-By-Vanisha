var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern=[];
var level=0;
var started=false;

$(document).on("keydown", function(){
  if(!started){
   
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
 }});

 $(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel)
 {
   if (userClickedPattern[currentLevel]===gamePattern[currentLevel])
   { console.log("Success");
    if(userClickedPattern.length===gamePattern.length)
    {
        setTimeout(function(){nextSequence()}, 1000);
        userClickedPattern=[];
    } }
    else
    {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass(".game-over")
        },200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
  
 }

function nextSequence()
{
   userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}   

function animatePress(currentcolor){
        $("#"+currentcolor).addClass("pressed");
        setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
  }, 100);
}

 
function playSound(name){
    var colorAudio = new Audio("./sounds/"+name+".mp3");
    colorAudio.play();
}

 function startOver(){
    level=0;
    gamePattern=[];
    started=false;
 }

// Array for random sequence
var gamePattern = [];

// Array for sequence selector
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to hold user choices from memory
var userClickedPattern = [];

var started = false;
var level = 0;

// keep track if game has started
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

// listen for user's choices
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    // play sound of the button user clicked
    playSound(userChosenColour);

    //animate user clicks
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// handle actions for next sequence to be displayed to user
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // get a random button color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Animate the button (by a flash) to be noticed by user
    $("#"+randomChosenColour).fadeOut(100,function(){
        $("#"+randomChosenColour).fadeIn(100)
    });

    playSound(randomChosenColour);

}

function playSound(name) {
    // play the button's sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  // Handles game restart
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
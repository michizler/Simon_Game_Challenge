// Array for random sequence
var gamePattern = [];

// Array for sequence selector
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to hold user choices from memory
var userClickedPattern = [];

// listen for user's choices
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    // play sound of the button user clicked
    playSound(userChosenColour);

    //animate user clicks
    animatePress(userChosenColour);

})

// handle actions for next sequence to be displayed to user
function nextSequence() {

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


let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let gameHasStarted = false;
let level = 0;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  for (let i = 0; i < gamePattern.length; i++) {
    $("#" + gamePattern[i])
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);

    playSound(gamePattern[i]);
    await delay(500);
  }
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  let currentButton = $("#" + currentColor);
  currentButton.addClass("pressed");
  delay(100).then(() => currentButton.removeClass("pressed"));
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      delay(1000).then(() => nextSequence());
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    delay(200).then(() => $("body").removeClass("game-over"));
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameHasStarted = false;
}

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (gameHasStarted) {
    checkAnswer(userClickedPattern.length - 1);
  }
});

$(document).on("keypress", function () {
  if (!gameHasStarted) {
    $("#level-title").text("Level " + level);
    gameHasStarted = true;
    nextSequence();
  }
});

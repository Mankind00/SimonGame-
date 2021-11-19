
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameCheatPattern = [];

var started = false;

var level = 0;

$(document).keydown(function() {
    if(!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);


    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    
    } else {
        var gameOver = "wrong";
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        playSound(gameOver);
        startOver();
        console.log("wrong");
    }
}

function startOver() {

    if(started) {
        
        $("#level-title").text("Game Over, press Any Key to Restart");
    }

    level = 0;
    gamePattern = [];
    started = false;
}


function nextSequence() {
    userClickedPattern = [];

    gameCheatPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    gameCheatPattern.push(randomChosenColour);

    if ($("#activate-cheat").val() === "godmode") {
        cheatPattern();
    }

    // console.log(gamePattern);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    

}

function cheatPattern() {
    for (var i = 0; i < gamePattern.length; i++) {
        (function(i) {
            setTimeout(function () {
                $("#" + gamePattern[i]).addClass("pressed");
                console.log("value is ", gamePattern[i]);
            }, 700 * (i + 1));
        setTimeout(function () {
            $("#" + gamePattern[i]).removeClass("pressed");
            console.log("value is ", gamePattern[i]);
        }, 710* (i + 1));
        })(i);
        // console.log(gameCheatPattern[i]);
    }
    

}

function playSound(name) {
    var sound = new Audio ("sounds/"+ name +".mp3");
sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
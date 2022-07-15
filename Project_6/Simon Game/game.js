var isPlaying = false;
var mouseClicks = 0;
var level = 0;
var POSSIBLE_SEQUENCE = ['blue', 'green', 'yellow', 'red'];
var sq = [];

// check if game needs to start or restarted
$(document).keydown(function() {
    if(!isPlaying) {
        resetGame();
    }
});

// activate sounds for buttons
$('#green, #blue, #yellow, #red').click(function() {
    if(isPlaying) {
        checkAnswer(this.id, mouseClicks);
    }
});



function updateHeader(level) {
    $('#level-title').text('Level ' + level);
}

// Check user's selection against sequence list
function checkAnswer(colorPicked, sqIndex) {

    
    if(colorPicked != sq[sqIndex]) {
        isPlaying = false;
        gameOver();
    } else {
        setTimeout(() => {playGivenSound(colorPicked);}, 100 * sqIndex);

        if(sqIndex == sq.length-1) {
            mouseClicks = 0;
            generateSequence();
            playAllSequence();
            updateHeader(++level);
        } else {
            mouseClicks++;
        }
    }
}

// Generate random index and insert it into sequence
function generateSequence() {
    var randomIndex = Math.floor(Math.random() * 4);
    sq.push(POSSIBLE_SEQUENCE[randomIndex]);
}

// Play the sequence for user
function playAllSequence() {
    for(var i = 0; i <sq.length; i++) {
        var color = sq[i];
        (function(color, i) {
            setTimeout(() => {
                playGivenSound(color);
            }, 500 * (i + 1));
        }(color, i));
    }
}

// Play given button sound
function playGivenSound(colorSound) {
    var buttonSound = new Audio('sounds/'+colorSound+'.mp3');
    pressedButtonAnimation(colorSound);
    buttonSound.play();
}

//Stop the game once sequence does not match
function gameOver() {
    $('#level-title').text('Game Over, Press Any Key to Restart');
    var gameOverSound = new Audio('sounds/wrong.mp3');
    gameOverSound.play();
    $('body').addClass('game-over');
    sq = [];
}

// Reset the game
function resetGame() {
    isPlaying = true;
    level = 1;
    mouseClicks = 0;
    $('body').removeClass('game-over');
    updateHeader(level);
    generateSequence();
    
    setTimeout(() => {
        playAllSequence();
    }, 400);
}

// Animate the button
function pressedButtonAnimation(buttonId) {
    $('#' + buttonId).addClass('pressed');
    setTimeout(() => {
        $('#' + buttonId).removeClass('pressed');
    }, 300);
}
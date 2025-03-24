// I know that this code is not the good one.
// But i created it from scratch. you can easily understand the code
// For code of professionals: https://github.com/subhranshuchoudhury/My-Js-Notes/blob/main/Challenge/Simon%20Game%20jQuery%20JS/game.js
// Enjoyed a lot while making the game.

/****************************************/

var keys = ["red", "green", "yellow", "blue"];
var computerArrayRecord = [];
var userArrayRecord = [];
var buttons = document.querySelectorAll(".btn");
var startButton = document.querySelector(".s-btn");
var display = document.querySelector(".display");
var scoreDisplay = document.querySelector(".score");
var highScoreDisplay = document.querySelector(".high-score");
var muteButton = document.querySelector(".mute-btn");
var themeToggle = document.querySelector(".theme-toggle");
var difficultySelect = document.querySelector(".difficulty");
var level = 0, score = 0, counter = 0, flag = 0;
var isGameStarted = false, isMuted = false;
var highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.innerHTML = "High Score: " + highScore;
var timer;

// Start the game
function startGame() {
    if (!isGameStarted) {
        document.body.classList.remove("game-over");
        display.innerHTML = "Remember the pattern and repeat it!";
        userArrayRecord = [];
        scoreDisplay.textContent = "Score: 0";
        counter++;
        score = 0;
        isGameStarted = true;
        startButton.style.display = "none";
        nextSequence();
    }
}

function nextSequence() {
    userArrayRecord = [];
    level++;
    display.innerHTML = "Level: " + level;
    var randomKey = keys[Math.floor(Math.random() * 4)];
    playSound(randomKey);
    animateButton(randomKey);
    computerArrayRecord.push(randomKey);
    startTimer();
}


function startTimer() {
    clearTimeout(timer);
    var difficulty = difficultySelect.value;
    var timeLimit = difficulty === "easy" ? 5 : difficulty === "medium" ? 3 : 2;
    timer = setTimeout(gameOver, timeLimit * 1000);
}


buttons.forEach(button => {
    button.addEventListener("click", function (e) {
        if (isGameStarted) {
            var chosenColor = e.target.id;
            userArrayRecord.push(chosenColor);
            playSound(chosenColor);
            animateButton(chosenColor);
            checkAnswer(userArrayRecord.length - 1);
        }
    });
});


function checkAnswer(index) {
    if (userArrayRecord[index] === computerArrayRecord[index]) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
        if (userArrayRecord.length === computerArrayRecord.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}


function gameOver() {
    document.body.classList.add("game-over");
    playSound("wrong");
    display.innerHTML = "Game Over! Final Score: " + score;
    isGameStarted = false;
    startButton.style.display = "block";
    startButton.innerHTML = "Restart Game";
    computerArrayRecord = [];
    level = 0;
    counter = 0;
    clearTimeout(timer);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = "High Score: " + highScore;
    }
}


function playSound(name) {
    if (!isMuted) {
        try {
            var audio = new Audio(`sounds/${name}.mp3`);
            audio.play();
        } catch (e) {
            console.log("Audio error", e);
        }
    }
}


function animateButton(color) {
    var button = document.querySelector("#" + color);
    button.classList.add("selected");
    setTimeout(() => button.classList.remove("selected"), 200);
}


muteButton.addEventListener("click", function () {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? "Unmute" : "Mute";
});


themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});


difficultySelect.addEventListener("change", function () {
    display.innerHTML = "Difficulty set to " + difficultySelect.value;
});

startButton.addEventListener("click", startGame);

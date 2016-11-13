// Enemies our player must avoid

var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //if the enemy reaches the last point the the enemy comes back to the
    //original place.
    if (this.x > 505) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//to reset the enemy position
Enemy.prototype.reset = function() {
    this.x = -200;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// player class
var player = function(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/char-cat-girl.png';

};
//Draws the player and score on the screen.
player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    ctx.font = "30px italic";
    ctx.fillText("score:" + " " + this.score, 0, 40);
    $("#Tscore").text(player.score);

};
//resets the player to orginal position
player.prototype.reset = function(x, y) {
    this.x = 200;
    this.y = 400;
};

//handleInput() moves according to user keboard moves.
player.prototype.handleInput = function(move) {

    if (move === 'left' && this.x >= 50) {
        this.x -= 100;
    }
    if (move === 'right' && this.x <= 350) {
        this.x += 100;
    }
    if (move === 'down' && this.y <= 350) {
        this.y += 90;
    }
    if (move === 'up' && this.y > 50) {
        this.y -= 90;
    } else if (move === 'up' && this.y <= 50) {
        //if the player reach the water , score will be incremented by 10
        this.score += 10;
        // if the score exceed 200 alert will be pop up
        if (this.score >= 200) {

            alert("congrats you won the game...   " + player.score + "is your score!");
        }
        this.reset();
    }
};
//player update function
player.prototype.update = function() {

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new player(200, 400);
var enemy1 = new Enemy(0, 60, 130);
var enemy2 = new Enemy(0, 150, 220);
var enemy3 = new Enemy(0, 225, 260);
var enemy4 = new Enemy(0, 160, 300);
var enemy5 = new Enemy(0, 50, 170);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

//Checks the player's collisios with the enemies
var checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        if (Math.abs(enemy.x - player.x) < 50 && Math.abs(enemy.y - player.y) < 50) {
            player.score -= 5; //reduce the score by 5 points when collision takes place.
            player.reset(); //resets the player
        }
    });

};
//Declaration of a boolean variable to deny the movement of player
//until game start.
var stopGame = Boolean(true);
//declation of time in seconds
var game_duration_sec = 20;
var timer; //Declaration of timer
$("#timer").text(game_duration_sec);
//game initialization function to initialize the game
var gameInitialization = function() {
    stopGame = true; //changing the value of the global variable
    player.score = 0; //reinitialising the score to 0.
    ////assigning the game_duration_sec variable to the timer id in html file
    $("#timer").text(game_duration_sec);
};
//gamestart function to start the game
var gameStart = function() {
    player.score = 0;
    timer = game_duration_sec; //assigning the game_duration_sec variable to timer variable
    $("#timer").text(timer); //placing the timer variable value in timer id.
    //setInterval function
       gameInterval = setInterval(function() {
        timer -= 1; //timer value is decremented by 1 second
        if (timer <= 0) {
            gameStop(); //invokes the gamestop function
            $('#maindiv').removeClass('display-none'); //not to display the present div
            $('#maindiv').addClass('display-block'); //to display a new div after the countdown of timer
        }
        $("#timer").text(timer);
    }, 1000);
    stopGame = false; //changing the value of the global variable
};
//gamestop function to stop the game
var gameStop = function() {
    $("#timer").text("0"); //place the timer id with 0.
    clearInterval(gameInterval); // stop timer
    player.reset(0); // move player to start position
    stopGame = true; //changing the global variable
};

//on click function for the startButton, It sets the game rolling
$("#startButton").click(function() {
    $("#maindiv").removeClass("display-block");
    $("#maindiv").addClass("display-none");
    $("#startButton").addClass("display-none");
    gameStart(); //invokes gamestart function
});
//on click function for the button, it enables for the restart of the game
$("#buttonAgain").click(function() {
    $("#startButton").removeClass("display-none");
    $("#maindiv").removeClass("display-block");
    $("#maindiv").addClass("display-none");
    gameInitialization(); //invokes gameInitialization function
});
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (stopGame === false) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
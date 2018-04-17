/* Variables and Objects*/
var screenwidth = 500;
var gamestate = true;
var highScore = 0;

/* the enemies track */
var rowsenemies = [50, 130, 220, 300];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    var randomRow = randomEnemies(0, rowsenemies.length - 1);
    this.row = randomRow + 1;
    this.x = randomEnemies(-50, -500);
    this.y = rowsenemies[randomRow];
    this.speed = randomEnemies(100, 300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > screenwidth) {
        this.x = -100;
        this.speed = randomEnemies(100, 300);
        var randomRow = randomEnemies(0, rowsenemies.length - 1);
        this.row = randomRow + 1;
        this.y = rowsenemies[randomRow];
    }

    // when the player will reset.
    if (this.row == player.row) {
        if (this.x + 70 >= player.x && this.x <= player.x + 70) {
            player.life -= 1;
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// random enemies.
function randomEnemies(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.row = 5;
    this.score = 0;
    gamestate = true;
    this.x = 202;
    this.y = 405;
    this.life = 5;

};

// update the player .
Player.prototype.update = function(dt) {

    //stop the game when your life is 0 .
    if (this.life === 0) {
        gamestate = false;
    }

    //get 1 score when you avoid all the Enemies.
    if (this.y <= 60) {
        this.score += 1;
        this.reset();
    }


};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillText('Score: ' + this.score, 355, 550);

    //show the high score
    ctx.fillText('High Score: ' + highScore, 275, 90);
    if (this.score > highScore) {
        highScore += 1;
    }
    if (this.life === 0) {
        ctx.fillText('Game Over', 150, 345);
    }
};




//put the keys of moving the player , pause , and reset the game.
Player.prototype.handleInput = function(key) {

    if (key == 'up' && this.y >= 60 && gamestate) {
        this.y = this.y - 83;
        this.row += -1;
    }

    if (key == 'down' && this.y <= 399 && gamestate) {
        this.y = this.y + 83;
        this.row += 1;
    }

    if (key == 'left' && this.x >= 1 && gamestate) {
        this.x = this.x - 101;
    }

    if (key == 'right' && this.x <= 402 && gamestate) {
        this.x = this.x + 101;
    }

    if (key == 'pause') {
        if (gamestate) {
            gamestate = false;
        } else {
            gamestate = true;
        }
    }

    if (key == 'reset') {
        this.newGame();
    }

};

Player.prototype.newGame = function() {
    player = new Player();
};

//to reset the player
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
    this.row = 5;
};

//connect with the heart image
var hearts = function() {
    this.sprite = 'images/Heart.png';
};

//draw the hearts on the screen
hearts.prototype.render = function() {
    var x = 10;
    for (var i = 0; i < player.life; i++) {
        ctx.drawImage(Resources.get(this.sprite), x, 60);
        x += 35;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var life = new hearts();
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'pause',
        82: 'reset'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// This listens for key presses and disables default scroll actions.
document.addEventListener('keydown', function(e) {
    if ([37, 38, 39, 40, 80, 82].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

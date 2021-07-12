// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle element
const computerPaddle = document.querySelector('.computer-paddle');
const playerPaddle = document.querySelector('.player-paddle');
const ball = document.querySelector('.ball');

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 1;
let playerPaddleYPosition = 100;
let playerPaddleYVelocity = 5;

let ballYPosition = 0;
let ballXPosition = 0;
let ballYVelocity = 2;
let ballXVelocity = 2;

// Update the pong world
function update() {
    if(computerPaddleYPosition >400){
        computerPaddleYVelocity = computerPaddleYVelocity *-1
    }
    else if(computerPaddleYPosition < 0){
        computerPaddleYVelocity = computerPaddleYVelocity *-1
    }
    // Update the computer paddle's position
    computerPaddleYPosition = computerPaddleYPosition + computerPaddleYVelocity;

    // Apply the y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    if(ballXPosition > 700-20){
        ballXVelocity = ballXVelocity*-1
    }
    else if(ballYPosition > 500-20){
        ballYVelocity = ballYVelocity*-1
    }
    if(ballXPosition < 0){
        ballXVelocity = ballXVelocity*-1
    }
    else if(ballYPosition <0 ){
        ballYVelocity = ballYVelocity*-1
    }
    ballXPosition = ballXPosition + ballXVelocity
    ballYPosition = ballYPosition + ballYVelocity
    ball.style.top =`${ballYPosition}px`;
    ball.style.left =`${ballXPosition}px`;
}

document.addEventListener('keydown', function(event){
    // player paddle down
    if(event.keyCode == 40){
        playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity
        playerPaddle.style.top =`${playerPaddleYPosition}px`;
    }
    // player paddle up
    else if(event.keyCode == 38){
        playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity*-1
        playerPaddle.style.top =`${playerPaddleYPosition}px`;
    }
})

// Call the update() function every 35ms
setInterval(update, 15);

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
let playerPaddleYVelocity = 10;

let ballYPosition = 0;
let ballXPosition = 0;
let ballYVelocity = 2;
let ballXVelocity = 2;

// Update the pong world
function update() {
    // Update the computer paddle's position tracking ball
    computerPaddleYPosition = ballYPosition -50 + BALL_SIZE;
    if(computerPaddleYPosition >400){
        computerPaddleYPosition = 400;
    }
    else if(computerPaddleYPosition < 0){
        computerPaddleYPosition = 0;
    }

    // Apply the y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    if(ballYPosition > playerPaddleYPosition -15 && ballYPosition < playerPaddleYPosition +115 && ballXPosition < 20){
        ballXPosition = 20
        ballXVelocity = ballXVelocity*-1
        console.log('true')
    }
    else if(ballXPosition > 700-40){
        ballXVelocity = ballXVelocity*-1
    }
    else if(ballYPosition > 500-20){
        ballYVelocity = ballYVelocity*-1
    }
    else if(ballXPosition < 0){
        ballXPosition = 350 -BALL_SIZE
        ballyPosition = 250 -BALL_SIZE
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
    const spacer = 5
    // player paddle down
    if(event.keyCode == 40){
        if(playerPaddleYPosition > 400 - spacer){
            playerPaddleYPosition = playerPaddleYPosition + 0;
        }
        else{
            playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity;
            playerPaddle.style.top =`${playerPaddleYPosition}px`;
        }
    }
    // player paddle up
    else if(event.keyCode == 38){
        if(playerPaddleYPosition < 0 + spacer){
            playerPaddleYPosition = playerPaddleYPosition + 0;
        }
        else{
            playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity*-1;
            playerPaddle.style.top =`${playerPaddleYPosition}px`;
        }
    }
})

// Call the update() function every 35ms
setInterval(update, 25);

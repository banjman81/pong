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
const harder = document.querySelector('.addBallSpeed');
const easier = document.querySelector('.reduceBallSpeed');
const level = document.querySelector('h1.level');
const tracker = document.querySelector('h1.score');
const maxTracker = document.querySelector('h1.highScore');

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 1;
let playerPaddleYPosition = 100;
let playerPaddleYVelocity = 10;

let botPLay = false
let ballYPosition = 0;
let ballXPosition = 0;
let ballYVelocity = 1;
let ballXVelocity = 1;
let stage = 1;
let score = 0
let highScore = 0

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
    if(ballYPosition > playerPaddleYPosition -15 && ballYPosition < playerPaddleYPosition +99 && ballXPosition < 20){
        ballXPosition = 20
        ballXVelocity = ballXVelocity*-1
        console.log('true')
        score++
        if(highScore < score){
            highScore = score
        }
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
        alert('Game Over!! Click "OK" to try again.')
        ballYVelocity = 1;
        ballXVelocity = 1;
        stage = 1
        score = 0
    }
    else if(ballYPosition <0 ){
        ballYVelocity = ballYVelocity*-1
    }
    
    ballXPosition = ballXPosition + ballXVelocity
    ballYPosition = ballYPosition + ballYVelocity
    ball.style.top =`${ballYPosition}px`;
    ball.style.left =`${ballXPosition}px`;
    level.innerText = `Level: ${stage}`
    level.style.color = 'white'
    tracker.innerText = `Score: ${score}`
    maxTracker.innerText = `Highscore: ${highScore}`
    tracker.style.color = 'white'
    maxTracker.style.color = 'lime'
    tracker.style.margin = '10px'
    maxTracker.style.margin = '10px'
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

function speedSetter(stage){
    // set ball speed
    if(stage == 1){
        return 1
    }
    else if(stage == 2){
        return 3
    }
    else if(stage == 3){
        return 5
    }
}

harder.addEventListener('click', function(){
    if(stage < 3){
        stage++
        ballXVelocity = speedSetter(stage)
        ballYVelocity = speedSetter(stage)
        ballXPosition = 350 -BALL_SIZE
        ballyPosition = 250 -BALL_SIZE
    }
})

easier.addEventListener('click', function(){
    if(stage > 1){
        stage--
        ballXVelocity = speedSetter(stage)
        ballYVelocity = speedSetter(stage)
        ballXPosition = 350 -BALL_SIZE
        ballyPosition = 250 -BALL_SIZE
    }
})


// Call the update() function every 35ms
setInterval(update, 20);

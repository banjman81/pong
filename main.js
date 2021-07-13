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
const shield = document.querySelector('.shield');
const ball = document.querySelector('.ball');
const ball2 = document.querySelector('.ball2');
const harder = document.querySelector('.addBallSpeed');
const easier = document.querySelector('.reduceBallSpeed');
const level = document.querySelector('h1.level');
const tracker = document.querySelector('h1.score');
const maxTracker = document.querySelector('h1.highScore');
const note = document.querySelector('.note');

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
let ball2YPosition = 250;
let ball2XPosition = 700-BALL_SIZE;
let ball2YVelocity = 1;
let ball2XVelocity = -1;
let stage = 1;
let score = 0
let highScore = 0
let opacityValue = 1.2

// Update the pong world
function update() {
    if(stage === 1){
        shield.style.opacity = '0'
        ball2.style.opacity ='0'
        note.style.opacity = '0'
    }
    else if(stage > 1){
        if(opacityValue >0){
            opacityValue = opacityValue -0.002
            note.style.opacity = `${opacityValue}`
            }
        shield.style.opacity = '1'
        ball2.style.opacity ='1'
    }
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
    shield.style.top = `${computerPaddleYPosition-5}px`;
    shield.style.left = `670px`;
    if(ballYPosition > playerPaddleYPosition -5 && ballYPosition < playerPaddleYPosition +99 && ballXPosition < 20){
        ballXPosition = 20
        ballXVelocity = ballXVelocity*-1
        console.log('true')
        score++
        if(highScore < score){
            highScore = score
        }
    }
    else if(ball2YPosition > playerPaddleYPosition -5 && ball2YPosition < playerPaddleYPosition +99 && ball2XPosition < 20){
        if(stage >1){
            console.log('true bad')
            ballXVelocity = ballXVelocity*-1
            ballYVelocity = 1;
            ballXVelocity = 1;
            ball2YVelocity = 1;
            ball2XVelocity = 1;
            alert('Game Over!! Click "OK" to try again.')
            stage = 1
            score = 0
        }
        else{
            ball2XPosition = 20
            ball2XVelocity = ball2XVelocity*-1
        }
        
    }
    else if(ballXPosition > 700-40){
        ballXVelocity = ballXVelocity*-1
    }
    else if(ballYPosition > 500-18){
        ballYPosition -= 2
        ballYVelocity = ballYVelocity*-1
    }
    else if(ballXPosition < 0){
        ballXVelocity = ballXVelocity*-1
        ballXPosition = 350 -BALL_SIZE
        ballyPosition = 250 -BALL_SIZE
        alert('Game Over!! Click "OK" to try again.')
        ballYVelocity = 1;
        ballXVelocity = 1;
        ball2YVelocity = 1;
        ball2XVelocity = 1;
        stage = 1
        score = 0
    }
    else if(ballYPosition <1 ){
        ballYPosition += 2
        ballYVelocity = ballYVelocity*-1
    }
    // ball collisions
    if(ballYPosition > ball2YPosition-BALL_SIZE && ballYPosition < ball2YPosition +BALL_SIZE && ballXPosition > ball2XPosition-BALL_SIZE && ballXPosition < ball2XPosition +BALL_SIZE && stage >1){
        if(ball2XVelocity>0 && ballXVelocity >0){
            if(ball2YVelocity >0){
                ball2YPosition -=5
                ball2YVelocity = ball2YVelocity*-1
            }
            else{
                ball2YPosition +=5
                ball2YVelocity = ball2YVelocity*-1
            }
            if(ballYVelocity >0){
                ballYPosition -=5
                ballYVelocity = ballYVelocity*-1
            }
            else{
                ballYPosition +=5
                ballYVelocity = ballYVelocity*-1
            }
        }
        // else if(ball2XVelocity<0 & ballXVelocity <0){
        //     if(ball2YVelocity >0){
        //         ball2YPosition -=5
        //         ball2YVelocity = ball2YVelocity*-1
        //     }
        //     else{
        //         ball2YPosition +=5
        //         ball2YVelocity = ball2YVelocity*-1
        //     }
        //     if(ballYVelocity >0){
        //         ballYPosition -=5
        //         ballYVelocity = ballYVelocity*-1
        //     }
        //     else{
        //         ballYPosition +=5
        //         ballYVelocity = ballYVelocity*-1
        //     }
        // }
        else if((ball2XVelocity>0 && ballXVelocity <0) || (ball2XVelocity<0 && ballXVelocity >0)){
            ballXVelocity = ballXVelocity*-1
            if(ballXVelocity >0){
                ballXPosition += 5
            }
            else{
                ballXPosition -= 5
            }
            ball2XVelocity = ball2XVelocity*-1
            if(ball2XVelocity >0){
                ball2XPosition += 5
            }
            else{
                ball2XPosition -= 5
            }
        }
    }
    
    if(ball2YPosition > computerPaddleYPosition -15 && ball2YPosition < computerPaddleYPosition +99 && ball2XPosition > 650 ){
        ball2XPosition = 650
        ball2XVelocity = ball2XVelocity*-1
        console.log('true red')
    }
    else if(ball2XPosition > 700-BALL_SIZE){
        ball2XVelocity = ball2XVelocity*-1
    }
    else if(ball2YPosition > 500-20){
        ball2YPosition -= 2
        ball2YVelocity = ball2YVelocity*-1
    }
    else if(ball2XPosition < 0){
        ball2XVelocity = ball2XVelocity*-1
    }
    else if(ball2YPosition <1 ){
        ball2YPosition += 2
        ball2YVelocity = ball2YVelocity*-1
    }


    //ball 1`
    ballXPosition = ballXPosition + ballXVelocity
    ballYPosition = ballYPosition + ballYVelocity
    ball.style.top =`${ballYPosition}px`;
    ball.style.left =`${ballXPosition}px`;
    //ball 2
    ball2XPosition = ball2XPosition + ball2XVelocity
    ball2YPosition = ball2YPosition + ball2YVelocity
    ball2.style.top =`${ball2YPosition}px`;
    ball2.style.left =`${ball2XPosition}px`;
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
        ball2XVelocity = speedSetter(stage)*-1
        ball2YVelocity = speedSetter(stage)
        ballX2Position = 350 -BALL_SIZE
        bally2Position = 250 -BALL_SIZE
    }
})

easier.addEventListener('click', function(){
    if(stage > 1){
        stage--
        ballXVelocity = speedSetter(stage)
        ballYVelocity = speedSetter(stage)
        ballXPosition = 350 -BALL_SIZE
        ballyPosition = 250 -BALL_SIZE
        ball2XVelocity = speedSetter(stage)*-1
        ballY2Velocity = speedSetter(stage)
        ball2XPosition = 350 -BALL_SIZE
        ball2YPosition = 250 -BALL_SIZE
    }
})


// Call the update() function every 35ms
setInterval(update, 20);

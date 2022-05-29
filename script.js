let myCanvas = document.getElementsByClassName("myCanvas")[0];
let ctx = myCanvas.getContext("2d")
let x, y;
let mode, circles
let score = 0
let scoreBoard = document.getElementsByClassName("score")[0];
let timer = document.getElementsByClassName("time")[0];
let time = 60
let button = document.getElementsByClassName("button")[0]
let timeTraining = document.getElementsByClassName("timeTraining")[0];
let accuracyTraining = document.getElementsByClassName("accuracyTraining")[0];
let reactionTraining = document.getElementsByClassName("reactionTraining")[0];
let gameInterval
let game = document.getElementsByClassName("game")[0];
let gameTimeout
let randomTime = 0
let best = document.getElementsByClassName("best")[0];
myCanvas.width = 900;
myCanvas.height = 400;
let start = document.getElementsByClassName("start")[0];
myCanvas.onclick = function (event) {
    console.log(ctx.getImageData(event.offsetX,event.offsetY,1,1));
    if (ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[0] == 255) {
        // console.log("Силя");
        score = score + 1
        if (mode == "time") {
            getCircle()
        }
        else if (mode == "accuracy") {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
        }
        // console.log(score);
        scoreBoard.innerHTML = "Score: " + score
    }
    if(ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[1] == 128){
        clearInterval(gameInterval)
        attempts = attempts+1
        if(time<score){
            score=time
        }
        if(attempts == 0){
            // start.innerHTML="start"
            // best.innerHTML = "Лучший результат:"+score
        }
        else{
            getReaction()
        }
        timer.innerHTML = "Attemps:"+attempts
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    }
    
}


function startGame() {
    if (mode == "time") {
        best.style.display="none"
        time = 60
        timer.innerHTML = "Time: " + time;
        start.onclick = function () {
            timeMode()
        }
    }
    if (mode == "accuracy") {
        best.style.display="none"
        circles = 30
        timer.innerHTML = "Circles: " + circles;
        start.onclick = function () {
            accuracyMode()
        }
    }
    if (mode == "reaction") {
        best.style.display="block"
        attempts = 0
        timer.innerHTML = "Attempts: " + attempts;
        start.onclick = function () {
            reactionMode()
        }
    }
}


function timeMode() {
    if (start.innerHTML == "start") {
        clearInterval(gameInterval)
        time = 60
        score = 0
        start.innerHTML = "stop"
        scoreBoard.innerHTML = "Score: " + score
        getCircle()
        gameInterval = setInterval(() => {
            time = time - 1
            timer.innerHTML = "Time: " + time
            if (time == 0) {
                ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
                clearInterval(gameInterval)
                start.innerHTML = "start"
            }
        }, 1000);
    }
    else {
        start.innerHTML = "start"
        clearInterval(gameInterval)
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    }
}
function accuracyMode() {
    if (start.innerHTML == "start") {
        clearInterval(gameInterval)
        circles = 20
        score = 0
        start.innerHTML = "stop"
        scoreBoard.innerHTML = "Score: " + score
        gameInterval = setInterval(() => {
            timer.innerHTML = "Circles: " + circles
            getCircle()
            if (circles == 0) {
                ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
                clearInterval(gameInterval)
                start.innerHTML = "start"
            }
            circles = circles - 1
        }, 1000);
    }
    else {
        start.innerHTML = "start"
        clearInterval(gameInterval)
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    }
}

function getReaction() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    ctx.beginPath()
    ctx.rect(0, 0, myCanvas.width, myCanvas.height)
    ctx.fillStyle = "green"
    randomTime = Math.floor(Math.random() * 9 + 2)
    console.log(randomTime);
    gameTimeout = setTimeout(function () {
        ctx.fill()
        time = 0
        gameInterval = setInterval(function () {
        time++
        scoreBoard.innerHTML= "time:"+time
        }, 0.1)
    }, randomTime * 1000)
}

function reactionMode() {
    if (start.innerHTML == "start") {
        start.innerHTML = "stop"
        clearInterval(gameInterval)
        score = 1000000
        attempts = 0
        getReaction()
    }
    else {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
        start.innerHTML = "start"
        best.innerHTML = "Лучший результат:"+score
    }
}
timeTraining.onclick = function (event) {
    console.log(timeTraining)
    game.style.transform = "translate(-50%,0)"
    mode = "time"
    startGame()
}
accuracyTraining.onclick = function () {
    game.style.transform = "translate(-50%,0)"
    mode = "accuracy"
    startGame()
}

reactionTraining.onclick = function (event) {
    game.style.transform = "translate(-50%,0)"
    mode = "reaction"
    startGame()
}


button.onclick = function (event) {
    game.style.transform = "translate(-50%,-100%)"
}










function getCircle() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
    x = Math.floor(Math.random() * 840) + 30
    y = Math.floor(Math.random() * 340) + 30
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI)
    ctx.strokeStyle = "gold"
    ctx.fillStyle = "gold"
    ctx.fill()
    ctx.stroke()
}
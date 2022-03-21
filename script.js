let myCanvas = document.getElementsByClassName("myCanvas")[0];
let ctx = myCanvas.getContext("2d")
let x,y;
let score = 0
let scoreBoard = document.getElementsByClassName("score")[0];
let timer = document.getElementsByClassName("time")[0];
let time = 60
let gameInterval
myCanvas.width = 900;
myCanvas.height = 400;
let start = document.getElementsByClassName("start")[0];
start.onclick =  function() {
    if(start.innerHTML == "start"){
        clearInterval(gameInterval)
        time=60
        score=0
        start.innerHTML = "stop"
        scoreBoard.innerHTML = "Score: "+score
        getCircle()
        gameInterval=setInterval(() => {
            time=time-1
            timer.innerHTML= "Time: "+time
            if(time==0){
                ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
                clearInterval(gameInterval)
                start.innerHTML = "start"
            }
        }, 1000);
    }
    else{
        start.innerHTML = "start"
        clearInterval(gameInterval)
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
    }
}
myCanvas.onclick = function(event){
    // console.log(ctx.getImageData(event.offsetX,event.offsetY,1,1));
    if(ctx.getImageData(event.offsetX,event.offsetY,1,1).data[0]==255){
        // console.log("Силя");
        score=score+1
        getCircle()
        // console.log(score);
        scoreBoard.innerHTML = "Score: "+score
    }
}




















function getCircle() {
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height)
    x = Math.floor(Math.random()*840)+30
    y = Math.floor(Math.random()*340)+30
    ctx.beginPath();
    ctx.arc(x,y,30,0,2*Math.PI)
    ctx.strokeStyle="gold"
    ctx.fillStyle="gold"
    ctx.fill()
    ctx.stroke()
}
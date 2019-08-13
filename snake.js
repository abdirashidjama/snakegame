var snake;
var canvas;
var ctx;
var score = 0;
var lastcoord = new Point2D(10000,100000); //hold last point since changing direction to prevent error of changing snake direction without anymovement
var gameover = false;


function Point2D(x,y){
    if(x instanceof Point2D) {
        return new Point2D(x.get(1), x.get(2));
    }
    this.x =x;
    this.y=y;
}
var food = new Point2D();

function init(){
    snake = {
        headpoint: new Point2D(10,10),
        length:1,
        direction: "R",
        body: []
    };
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    setfoodpoint();
    drawCanvas();
}

function bodyP(c, d){
    this.headpoint=c;
    this.direction=d;
}


function setfoodpoint(){
    var x = Math.floor((Math.random() * 990) + 0);
    var y = Math.floor((Math.random() * 590) + 0);
    food = new Point2D(x,y);
}

function moveindirection(p){
    switch(p.direction){
        case "R":
            p.headpoint.x += 10;
            break;
        case "L":
            p.headpoint.x -= 10;
            break;
        case "D":
            p.headpoint.y += 10;
            break;
        case "U":
            p.headpoint.y -= 10;
            break;
    }
}



function move(){
    checkCollision();
    moveindirection(snake);
    var obj = snake
    
    for(var i=0; i < snake.body.length; i++){
        let piece = snake.body[i];
        console.log("piece: " + piece.direction);
        console.log("obj: "+ obj);
        if(piece.direction == obj.direction){
            moveindirection(piece);
        }
        else{
            if(piece.headpoint.x == obj.headpoint.x || piece.headpoint.y == obj.headpoint.y){
                piece.direction = obj.direction;
                moveindirection(piece);
            }
            else{
                moveindirection(piece);
            }
        }
        obj = piece;
    }
    if(gameover==true){
        canvas = document.getElementById("game");
        ctx = canvas.getContext("2d");
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
        clearInterval(timer);
    }
    else{
        drawCanvas();
        
    }
}

function drawCanvas(){

    //draws snake head
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.rect(snake.headpoint.x, snake.headpoint.y, 10, 10);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath()
    //draws food
    ctx.beginPath();
    ctx.rect(food.x, food.y, 10, 10);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
    //draws rest of snake body
    for(var i=0; i < snake.body.length; i++){
        let b = snake.body[i];
        ctx.beginPath();
        ctx.rect(b.headpoint.x, b.headpoint.y, 10, 10);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath()
    }
    
}

function checkCollision(){
    var x = snake.headpoint.x;
    var y = snake.headpoint.y;
    var x2 = food.x;
    var y2 = food.y;
    //the snake grabs food
    if(Math.abs(x-x2) <= 10 && Math.abs(y-y2) <= 10 ){
        setfoodpoint();
        if(snake.length > 1){
            generatetail(snake.body[snake.length-2]);
        }
        else{
            generatetail(snake);
        }
        snake.length +=1;
        document.getElementById('score').innerHTML = "score: " + (snake.length - 1)*10;
    }
    //if the snake goes out of bounds
    if(x<0||x>1000||y>600||y<0){
        gameover=true;
    }
    
    //checks if snake collides with itself
    for(var i=0; i < snake.body.length; i++){
        let b = snake.body[i].headpoint;
        if(Math.abs(x-b.x) <= 5 && Math.abs(y-b.y) <= 5){
            gameover=true;
        }
    }
    
}

// function adds new piece behind and existing one. tail is new pieace head is the one before.
function generatetail(head){
    let tail = new bodyP(new Point2D(0,0),head.direction);
    console.log(tail);
    switch(head.direction){
        case "R":
            tail.headpoint.x = head.headpoint.x- 10;
            tail.headpoint.y = head.headpoint.y;
        
            break;
        case "L":
            tail.headpoint.x = head.headpoint.x + 10;
            tail.headpoint.y = head.headpoint.y;
            
            break;
        case "D":
            tail.headpoint.y = head.headpoint.y - 10;
            tail.headpoint.x = head.headpoint.x;
            break;
        case "U":
            tail.headpoint.y = head.headpoint.y + 10;
            tail.headpoint.x = head.headpoint.x;
            break;
    }
    snake.body.push(tail);
}

//changes direction based on key pressed
function keypressed(e){
    var currentcoord = snake.headpoint;
    if(Math.abs(currentcoord.x-lastcoord.x)>=10 || Math.abs(currentcoord.y-lastcoord.y)>=10 ){ //a catch to make sure direction isnt before physically
        switch(e){
            case 39:
                if(snake.direction!="L"){
                    snake.direction = "R";
                    move();
                }
                break;
            case 37:
                if(snake.direction!="R"){
                    snake.direction = "L";
                    move();
                }
                break;
            case 40:
                if(snake.direction!="U"){
                    snake.direction = "D";
                    move();
                }
                break;
            case 38:
                if(snake.direction!="D"){
                    snake.direction = "U";
                    move();
                }
                break;
        }
        lastcoord=new Point2D(currentcoord.x,currentcoord.y);
    }
}

var timer = setInterval(move, 40)


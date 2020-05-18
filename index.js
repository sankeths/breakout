console.log("connected");

var x = null;
var y = null;
var game_restart = "False"
var game_start = "True";
var game_over = "False";
var game_started = "True";
var game_inprogress = "False";
var block = document.getElementById('block');
var main_block = document.getElementById('main_block'); 
var play_block = document.getElementById('play_block');
var mousemove_block = document.getElementById('mousemove_block');
var square_block = document.getElementById('square_block');
var movementX = "right";
var movementY = "top";
var maxheight = 600;
var maxwidth = 500;
var groundX = 0;
var groundY = 20;
var playerPos;
var game_tackled = 0;
var Resid;
var incrementer = 0.5;
var StartText = document.getElementById("gameStartText");

square_block.style.bottom = groundY+"px";
square_block.style.left = x + 27 +"px";


    
document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);


mousemove_block.onclick = function(){
    game_restart = "True";
    if(game_inprogress != "True"){
        StartText.innerText = "Move Mouse within this game pad ";
        Runner();
    }
};


    
function onMouseUpdate() {
mousemove_block.onmousemove = function(e) { 

    // if(game_inprogress == "False"){
    //     x = 20;
    //     square_block.style.left = x + 37 +"px";
    //     play_block.style.left = x+"px";
    // }
    var x = e.pageX - this.offsetLeft - 50; 
    //console.log("e.pageX = "+e.pageX);
    //console.log("this.offsetLeft ="+this.offsetLeft)
    var y = e.pageY - this.offsetTop; 
    if( x <= 470 ){
        //console.log( x, y)
    play_block.style.left = x+"px";
    if (game_inprogress == "False"){
    square_block.style.left = x + 27 +"px";
    incrementer = 1;
}
    //console.log(x);
    playerPos = x;
}
}
}

// function getMouseX() {
//   return x;
// }

// function getMouseY() {
//   return y;
// }

function Runner(){
Resid = window.setInterval(function(){
    //console.log("Started event")
    if(game_restart != "False"){
        game_restart = "True";
        //console.log("Game Started");
        game_inprogress = "True";
        game();
    }

}, 1);
}

function game(){
    currentX = Number(square_block.style.left.replace("px",""));
    currentY = Number(square_block.style.bottom.replace("px",""));

    if(currentY <= groundY ){
        if(currentX >= playerPos-22 && currentX <= playerPos + 60){
            console.log("tackled at "+playerPos);
            game_tackled = game_tackled + 1;
            incrementer = Math.ceil(game_tackled/3);

        }
        else{
            console.log("hit the ground at "+currentX);
            console.log("player positioned at "+playerPos);
            console.log("********************************");
            console.log("Game Over");
            console.log("Game Tackled: "+game_tackled);
            console.log("********************************")
            game_over = "True";
            game_inprogress = "False";
            game_tackled = 0;
            clearInterval(Resid);
            StartText.innerText = "Click anywhere in this pad to RESTART this game";
        }
    }

    if(currentX <= groundX && movementX == "left"){
        movementX = "right";

    }

    if(currentX < maxwidth && Math.abs(currentX) >= groundX && movementX == "right"){
        currentX = currentX + incrementer;
        if(currentY == maxheight && movementY == "top"){
            movementY = "bottom";
        }

        if( currentY == groundY && movementY == "bottom"){
            movementY = "top";

        }
        if(currentY <= maxheight && currentY >= groundY && movementY == "top"){
            currentY = currentY + incrementer;
        }else if(currentY >= groundY ){
            currentY = currentY - incrementer;
            movementY = "bottom";
        }else{


        }
        square_block.style.left = currentX+"px";
        square_block.style.bottom = currentY+"px";
        // console.log("in if");
        // console.log("X moved "+movementX+" Y moved "+movementY);
        // console.log("****************************************");
    }
    else if (currentX > groundX)
    {
        movementX = "left";
        currentX = currentX - incrementer;

        if(currentY == maxheight && currentX >= groundX && movementY == "top"){
            movementY = "bottom";
        }

        if( currentY == groundY && movementY == "bottom"){
            movementY = "top";

        }
        if(currentY < maxheight && currentY >= groundY && movementY == "top"){
            currentY = currentY + incrementer;
        }else if(currentY > groundY){
            currentY = currentY - incrementer;
                        movementY = "bottom";

        }else{


        }
        square_block.style.left = currentX+"px";
        square_block.style.bottom = currentY+"px";
        // console.log("in else");
        // console.log("X moved "+movementX+" Y moved "+movementY);
        // console.log("****************************************");
    }
}
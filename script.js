let container = document.querySelector(".container");
let box = document.getElementById("box");
let enemyContainer = document.getElementById("enemyContainer");
let positionX=0, positionY=0;
let downMove = 0;
let stepsTaken = 5;
let fallingValueY = 15;
let activeKeys = {};

document.addEventListener("keydown", function(e) {
activeKeys[e.key.toLowerCase()]= true;
});
document.addEventListener("keyup", function (e){
    activeKeys[e.key.toLowerCase()]=false;
});
function moveBox(){
    if(activeKeys['w']){
        positionY-=stepsTaken;
    }
    if(activeKeys['s']){
        positionY+=stepsTaken;
    }
    if(activeKeys['a']){
     positionX-=stepsTaken;
    }
    if(activeKeys['d']){
        positionX+=stepsTaken;
    }
    box.style.transform = `translate(${positionX}px, ${positionY}px)`;
    requestAnimationFrame(moveBox);

}
moveBox();
function boxCollide(box, enemy) {
    let boxPos = box.getBoundingClientRect();
    let enemyPos = enemy.getBoundingClientRect();

    let horizontalPosition = boxPos.left < enemyPos.right && boxPos.right > enemyPos.left;
    let verticalPosition = boxPos.top < enemyPos.bottom && boxPos.bottom > enemyPos.top;

    if (horizontalPosition && verticalPosition) {
        window.alert("You have lost!!!!");
        container.remove();
    }
}

function createEnemyDivs() {
    let enemyDiv = document.createElement('div');
    enemyDiv.className = 'enemy';
    enemyContainer.append(enemyDiv);
    let positionX = Math.floor(Math.random() * 1000) + 1;
    enemyDiv.style.left = `${positionX}px`;
    startFalling(enemyDiv);
}


function startFalling(enemy) {
    let yPosition = 0;

    function fall() {
        yPosition += fallSpeed;
        enemy.style.top = `${yPosition}px`;
        checkCollision(box,enemy);

        if (yPosition < container.getBoundingClientRect().height-40) {
            requestAnimationFrame(fall);
        } else {
            enemy.style.visibility="hidden"
            enemy.remove(); // Remove the enemy when it goes out of the screen
        }
    }

    requestAnimationFrame(fall);
}

var interval = 200;
let createDivInter= setInterval(createEnemyDivs, interval);


let container= document.querySelector(".container");
let box = document.getElementById('box');
let positionX = 0;
let positionY = 0;
const step = 5;
let disappearInterval;
let fallSpeed = 4;

function checkCollision(player, enemy) {
    const rect1 = player.getBoundingClientRect();
    const rect2 = enemy.getBoundingClientRect();
    console.log(rect1);
    const horizontalCollision = rect1.left < rect2.right && rect1.right > rect2.left;
    const verticalCollision = rect1.top < rect2.bottom && rect1.bottom > rect2.top;
    if(horizontalCollision && verticalCollision){
        container.remove();
    }
}
document.addEventListener('keydown', function(event){
    switch(event.key){
        case 'w':
            positionY -= step;
            break;
        case 's':
            positionY += step;
            break;
        case 'a':
            positionX -= step;
            break;
        case 'd':
            positionX += step;
            break;
    }
    box.style.transform = `translate(${positionX}px,${positionY}px)`;

});

setInterval(addEnemyDiv, 500);


function addEnemyDiv(){

    const addedEnemy = document.createElement("div");
    addedEnemy.className = 'enemy';
    document.getElementById("enemyContainer").append(addedEnemy);
    let xPosition = Math.floor(Math.random()*1000)+1;
    addedEnemy.style.left = `${xPosition}px`;
    startFalling(addedEnemy);
}
function startFalling(addedEnemy){
    let yPosition =0;
    setInterval(function (){
        yPosition+=fallSpeed;
        addedEnemy.style.top = `${yPosition}px`;
        checkCollision(box,addedEnemy);
        setInterval(function (){
            addedEnemy.remove();
        },1410)

    },10);
}
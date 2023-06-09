// Final project

// Setup Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 600;
cnv.height = 600;

// Global Variables
let enemySpeed = 1;


let damage = 1
let bulletTimer = 0

let lives = 3

let speedCap = 3

let bullet1fired = false
let bullet2fired = false
let bullet3fired = false
let bullet4fired = false
let bullet5fired = false

let ehp1 = 5
let ehp2 = 5
let ehp3 = 5
let ehp4 = 5
let ehp5 = 5
// hitbox
pHitbox = {
  x: 287.5,
  y: 550,
  w: 25,
  h: 25,
}
bullet1 = {
  x: 800,
  y: 800,
  w: 5,
  h: 15
}
bullet2 = {
  x: 800,
  y: 800,
  w: 5,
  h: 15
}
bullet3 = {
  x: 800,
  y: 800,
  w: 5,
  h: 15
}
bullet4 = {
  x: 800,
  y: 800,
  w: 5,
  h: 15
}
bullet5 = {
  x: 800,
  y: 800,
  w: 5,
  h: 15
}

enemy1 = {
  x: Math.random() * 550,
  y: 50,
  w: 25 + Math.random() * 75,
  h: 25 + Math.random() * 75
}
enemy2 = {
  x: Math.random() * 550,
  y: -150,
  w: 25 + Math.random() * 75,
  h: 25 + Math.random() * 75
}
enemy3 = {
  x: Math.random() * 550  ,
  y: -350,
  w: 25 + Math.random() * 75,
  h: 25 + Math.random() * 75
}
enemy4 = {
  x: Math.random() * 550  ,
  y: -550,
  w: 25 + Math.random() * 75,
  h: 25 + Math.random() * 75
}
enemy5 = {
  x: Math.random() * 550  ,
  y: -750,
  w: 25 + Math.random() * 75,
  h: 25 + Math.random() * 75
}
let rightKeyPressed = false;
let leftKeyPressed = false;
let upKeyPressed = false;
let downKeyPressed = false;
let spaceKeyPressed = false;

// Call Draw Function on Page Load
window.addEventListener("load", draw);


//Draw function

function draw() {

    runGame();

  requestAnimationFrame(draw);
}
function drawStart() {
  drawMain();
  
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "red";
    ctx.fillText("CLICK TO START", 200, 300)
  
    ctx.font = "25px Consolas";
    ctx.fillText("Left and right arrow key to move", 200, 400);
    ctx.fillText("space to shoot", 200, 500);
  }
function runGame(){
  drawMain()
  detectCollision();
  // LOGIC
  if (rightKeyPressed) {

    pHitbox.x += 5 * (1 + enemySpeed*0.1);
  }

  if (leftKeyPressed) {

    pHitbox.x += -5 * (1 + enemySpeed*0.1);
  }
  if (upKeyPressed) {

    pHitbox.y += -5 * (1 + enemySpeed*0.1);
  }
  if (downKeyPressed) {

    pHitbox.y += 5 * (1 + enemySpeed*0.1);
  }

  // shoot  
  shoot()
  countDown()
  moveprojectile()
  moveEnemies()
  hitdetection()
  die()
  damagecap()
  speedcap()
  bulletgoback()
}


function drawMain() {
  // DRAWING
  // Draw Background
  ctx.fillStyle = "skyblue";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Rectangle
  ctx.fillStyle = "red";
  ctx.fillRect(pHitbox.x, pHitbox.y, pHitbox.w, pHitbox.h);

  // draw enemies
  ctx.fillStyle = "blue";
  ctx.fillRect(enemy1.x, enemy1.y, enemy1.w, enemy1.h);
  ctx.fillRect(enemy2.x, enemy2.y, enemy2.w, enemy2.h);
  ctx.fillRect(enemy3.x, enemy3.y, enemy3.w, enemy3.h);
  ctx.fillRect(enemy4.x, enemy4.y, enemy4.w, enemy4.h);
  ctx.fillRect(enemy5.x, enemy5.y, enemy5.w, enemy5.h);
  //draw bullets

  ctx.fillStyle = "green"
  ctx.fillRect(bullet1.x, bullet1.y, bullet1.w, bullet1.h);
  ctx.fillRect(bullet2.x, bullet2.y, bullet2.w, bullet2.h);
  ctx.fillRect(bullet3.x, bullet3.y, bullet3.w, bullet3.h);
  ctx.fillRect(bullet4.x, bullet4.y, bullet4.w, bullet4.h);
  ctx.fillRect(bullet5.x, bullet5.y, bullet5.w, bullet5.h);
}
// EVENT STUFF
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);



  function keydownHandler(event) {
  console.log(event.keyCode);

  if (event.keyCode === 39) {
    rightKeyPressed = true;
  } if (event.keyCode === 37) {
    leftKeyPressed = true;
  } if (event.keyCode === 38) {
    upKeyPressed = true;
  } if (event.keyCode === 40) {
    downKeyPressed = true;
  } if (event.keyCode === 32) {
    spaceKeyPressed = true
    }
  } 


function keyupHandler(event) {
  if (event.keyCode === 39) {
    rightKeyPressed = false;

  } if (event.keyCode === 37) {
    leftKeyPressed = false;

  } if (event.keyCode === 38) {
    upKeyPressed = false;

  } if (event.keyCode === 40) {
    downKeyPressed = false;
  }  if (event.keyCode === 32) {
    spaceKeyPressed = false
  }
}


function detectCollision () {
  if (pHitbox.x <= 0) {
    leftKeyPressed = false
  }
  if (pHitbox.x >= 600 - pHitbox.w ) {
    rightKeyPressed = false
  }
  if (pHitbox.y <= 0) {
    upKeyPressed = false
  }
  if (pHitbox.y >= 600 - pHitbox.h ) {
    downKeyPressed = false
  }
  }  
function countDown() {
 bulletTimer = bulletTimer - 1
}
function moveprojectile() {
  if (bullet1.y <= 600){
  bullet1.y = bullet1.y -15
  }
  if (bullet2.y <= 600){
  bullet2.y = bullet2.y -15
  }
  if (bullet3.y <= 600){
  bullet3.y = bullet3.y -15
  }
  if (bullet4.y <= 600){
  bullet4.y = bullet4.y -15
  }
  if (bullet5.y <= 600){
  bullet5.y = bullet5.y -15
  }
}
function moveEnemies() {
  enemy1.y += enemySpeed
  enemy2.y += enemySpeed
  enemy3.y += enemySpeed
  enemy4.y += enemySpeed
  enemy5.y += enemySpeed

  if (enemy1.y > 600) {
    enemy1.y = 50
    enemy1.h = 25 + Math.random() * 75
    enemy1.w = 25 + Math.random() * 75
    enemy1.x = Math.random() * 550
    enemy2.y = -150
    enemy2.h = 25 + Math.random() * 75
    enemy2.w = 25 + Math.random() * 75
    enemy2.x = Math.random() * 550
    enemy3.y = -350
    enemy3.h = 25 + Math.random() * 75
    enemy3.w = 25 + Math.random() * 75
    enemy3.x = Math.random() * 550
    enemy4.y = -550
    enemy4.h = 25 + Math.random() * 75
    enemy4.w = 25 + Math.random() * 75
    enemy4.x = Math.random() * 550
    enemy5.y = -750
    enemy5.h = 25 + Math.random() * 75
    enemy5.w = 25 + Math.random() * 75
    enemy5.x = Math.random() * 550
    enemySpeed = 1
    lives -=1
  }
  if (enemy2.y > 600) {
    enemy1.y = 50
    enemy1.h = 25 + Math.random() * 75
    enemy1.w = 25 + Math.random() * 75
    enemy1.x = Math.random() * 550
    enemy2.y = -150
    enemy2.h = 25 + Math.random() * 75
    enemy2.w = 25 + Math.random() * 75
    enemy2.x = Math.random() * 550
    enemy3.y = -350
    enemy3.h = 25 + Math.random() * 75
    enemy3.w = 25 + Math.random() * 75
    enemy3.x = Math.random() * 550
    enemy4.y = -550
    enemy4.h = 25 + Math.random() * 75
    enemy4.w = 25 + Math.random() * 75
    enemy4.x = Math.random() * 550
    enemy5.y = -750
    enemy5.h = 25 + Math.random() * 75
    enemy5.w = 25 + Math.random() * 75
    enemy5.x = Math.random() * 550
    enemySpeed = 1
    lives -=1
  }
  if (enemy3.y > 600) {
    enemy1.y = 50
    enemy1.h = 25 + Math.random() * 75
    enemy1.w = 25 + Math.random() * 75
    enemy1.x = Math.random() * 550
    enemy2.y = -150
    enemy2.h = 25 + Math.random() * 75
    enemy2.w = 25 + Math.random() * 75
    enemy2.x = Math.random() * 550
    enemy3.y = -350
    enemy3.h = 25 + Math.random() * 75
    enemy3.w = 25 + Math.random() * 75
    enemy3.x = Math.random() * 550
    enemy4.y = -550
    enemy4.h = 25 + Math.random() * 75
    enemy4.w = 25 + Math.random() * 75
    enemy4.x = Math.random() * 550
    enemy5.y = -750
    enemy5.h = 25 + Math.random() * 75
    enemy5.w = 25 + Math.random() * 75
    enemy5.x = Math.random() * 550
    enemySpeed = 1
    lives -=1
  }
  if (enemy4.y > 600) {
    enemy1.y = 50
    enemy1.h = 25 + Math.random() * 75
    enemy1.w = 25 + Math.random() * 75
    enemy1.x = Math.random() * 550
    enemy2.y = -150
    enemy2.h = 25 + Math.random() * 75
    enemy2.w = 25 + Math.random() * 75
    enemy2.x = Math.random() * 550
    enemy3.y = -350
    enemy3.h = 25 + Math.random() * 75
    enemy3.w = 25 + Math.random() * 75
    enemy3.x = Math.random() * 550
    enemy4.y = -550
    enemy4.h = 25 + Math.random() * 75
    enemy4.w = 25 + Math.random() * 75
    enemy4.x = Math.random() * 550
    enemy5.y = -750
    enemy5.h = 25 + Math.random() * 75
    enemy5.w = 25 + Math.random() * 75
    enemy5.x = Math.random() * 550
    enemySpeed = 1
    lives -=1
  }
  if (enemy5.y > 600) {
    enemy1.y = 50
    enemy1.h = 25 + Math.random() * 75
    enemy1.w = 25 + Math.random() * 75
    enemy1.x = Math.random() * 550
    enemy2.y = -150
    enemy2.h = 25 + Math.random() * 75
    enemy2.w = 25 + Math.random() * 75
    enemy2.x = Math.random() * 550
    enemy3.y = -350
    enemy3.h = 25 + Math.random() * 75
    enemy3.w = 25 + Math.random() * 75
    enemy3.x = Math.random() * 550
    enemy4.y = -550
    enemy4.h = 25 + Math.random() * 75
    enemy4.w = 25 + Math.random() * 75
    enemy4.x = Math.random() * 550
    enemy5.y = -750
    enemy5.h = 25 + Math.random() * 75
    enemy5.w = 25 + Math.random() * 75
    enemy5.x = Math.random() * 550
    enemySpeed = 1
    lives -=1
  }
}



function hitdetection() {
  // enemy 1

  if (bullet1.x >= enemy1.x && bullet1.x <= enemy1.x + enemy1.w && bullet1.y <= enemy1.y + enemy1.h && bullet1.y + bullet1.h> enemy1.y) {
    ehp1 -= damage
    bullet1.x = 800
    bullet1.y = 800
  }
  if (bullet2.x >= enemy1.x && bullet2.x <= enemy1.x + enemy1.w && bullet2.y <= enemy1.y + enemy1.h && bullet2.y + bullet2.h> enemy1.y) {
    ehp1 -= damage
    bullet2.x = 800
    bullet2.y = 800
  }
  if (bullet3.x >= enemy1.x && bullet3.x <= enemy1.x + enemy1.w && bullet3.y <= enemy1.y + enemy1.h && bullet3.y + bullet3.h> enemy1.y) {
    ehp1 -= damage
    bullet3.x = 800
    bullet3.y = 800
  }
  if (bullet4.x >= enemy1.x && bullet4.x <= enemy1.x + enemy1.w && bullet4.y <= enemy1.y + enemy1.h && bullet4.y + bullet4.h> enemy1.y) {
    ehp1 -= damage
    bullet4.x = 800
    bullet4.y = 800
  }
  if (bullet5.x >= enemy1.x && bullet5.x <= enemy1.x + enemy1.w && bullet5.y <= enemy1.y + enemy1.h && bullet5.y + bullet5.h> enemy1.y) {
    ehp1 -= damage
    bullet5.x = 800
    bullet5.y = 800
  }
  //enemy 2

  if (bullet1.x >= enemy2.x && bullet1.x <= enemy2.x + enemy2.w && bullet1.y <= enemy2.y + enemy2.h && bullet1.y + bullet1.h> enemy2.y) {
    ehp2 -= damage
    bullet1.x = 800
    bullet1.y = 800
  }
  if (bullet2.x >= enemy2.x && bullet2.x <= enemy2.x + enemy2.w && bullet2.y <= enemy2.y + enemy2.h && bullet2.y + bullet2.h> enemy2.y) {
    ehp2 -= damage
    bullet2.x = 800
    bullet2.y = 800
  }
  if (bullet3.x >= enemy2.x && bullet3.x <= enemy2.x + enemy2.w && bullet3.y <= enemy2.y + enemy2.h && bullet3.y + bullet3.h> enemy2.y) {
    ehp2 -= damage
    bullet3.x = 800
    bullet3.y = 800
  }
  if (bullet4.x >= enemy2.x && bullet4.x <= enemy2.x + enemy2.w && bullet4.y <= enemy2.y + enemy2.h && bullet4.y + bullet4.h> enemy2.y) {
    ehp2 -= damage
    bullet4.x = 800
    bullet4.y = 800
  }
  if (bullet5.x >= enemy2.x && bullet5.x <= enemy2.x + enemy2.w && bullet5.y <= enemy2.y + enemy2.h && bullet5.y + bullet5.h> enemy2.y) {
    ehp2 -= damage
    bullet5.x = 800
    bullet5.y = 800
  }
  //enemy 3

  if (bullet1.x >= enemy3.x && bullet1.x <= enemy3.x + enemy3.w && bullet1.y <= enemy3.y + enemy3.h && bullet1.y + bullet1.h> enemy3.y) {
    ehp3 -= damage
    bullet1.x = 800
    bullet1.y = 800
  }
  if (bullet2.x >= enemy3.x && bullet2.x <= enemy3.x + enemy3.w && bullet2.y <= enemy3.y + enemy3.h && bullet2.y + bullet2.h> enemy3.y) {
    ehp3 -= damage
    bullet2.x = 800
    bullet2.y = 800
  }
  if (bullet3.x >= enemy3.x && bullet3.x <= enemy3.x + enemy3.w && bullet3.y <= enemy3.y + enemy3.h && bullet3.y + bullet3.h> enemy3.y) {
    ehp3 -= damage
    bullet3.x = 800
    bullet3.y = 800
  }
  if (bullet4.x >= enemy3.x && bullet4.x <= enemy3.x + enemy3.w && bullet4.y <= enemy3.y + enemy3.h && bullet4.y + bullet4.h> enemy3.y) {
    ehp3 -= damage
    bullet4.x = 800
    bullet4.y = 800
  }
  if (bullet5.x >= enemy3.x && bullet5.x <= enemy3.x + enemy3.w && bullet5.y <= enemy3.y + enemy3.h && bullet5.y + bullet5.h> enemy3.y) {
    ehp3 -= damage
    bullet5.x = 800
    bullet5.y = 800
  }
  //enemy 4

  if (bullet1.x >= enemy4.x && bullet1.x <= enemy4.x + enemy4.w && bullet1.y <= enemy4.y + enemy4.h && bullet1.y + bullet1.h> enemy4.y) {
    ehp4 -= damage
    bullet1.x = 800
    bullet1.y = 800
  }
  if (bullet2.x >= enemy4.x && bullet2.x <= enemy4.x + enemy4.w && bullet2.y <= enemy4.y + enemy4.h && bullet2.y + bullet2.h> enemy4.y) {
    ehp4 -= damage
    bullet2.x = 800
    bullet2.y = 800
  }
  if (bullet3.x >= enemy4.x && bullet3.x <= enemy4.x + enemy4.w && bullet3.y <= enemy4.y + enemy4.h && bullet3.y + bullet3.h> enemy4.y) {
    ehp4 -= damage
    bullet3.x = 800
    bullet3.y = 800
  }
  if (bullet4.x >= enemy4.x && bullet4.x <= enemy4.x + enemy4.w && bullet4.y <= enemy4.y + enemy4.h && bullet4.y + bullet4.h> enemy4.y) {
    ehp4 -= damage
    bullet4.x = 800
    bullet4.y = 800
  }
  if (bullet5.x >= enemy4.x && bullet5.x <= enemy4.x + enemy4.w && bullet5.y <= enemy4.y + enemy4.h && bullet5.y + bullet5.h> enemy4.y) {
    ehp4 -= damage
    bullet5.x = 800
    bullet5.y = 800
  }
  //enemy 5

  if (bullet1.x >= enemy5.x && bullet1.x <= enemy5.x + enemy5.w && bullet1.y <= enemy5.y + enemy5.h && bullet1.y + bullet1.h> enemy5.y) {
    ehp5 -= damage
    bullet1.x = 800
    bullet1.y = 800
  }
  if (bullet2.x >= enemy5.x && bullet2.x <= enemy5.x + enemy5.w && bullet2.y <= enemy5.y + enemy5.h && bullet2.y + bullet2.h> enemy5.y) {
    ehp5 -= damage
    bullet2.x = 800
    bullet2.y = 800
  }
  if (bullet3.x >= enemy5.x && bullet3.x <= enemy5.x + enemy5.w && bullet3.y <= enemy5.y + enemy5.h && bullet3.y + bullet3.h> enemy5.y) {
    ehp5 -= damage
    bullet3.x = 800
    bullet3.y = 800
  }
  if (bullet4.x >= enemy5.x && bullet4.x <= enemy5.x + enemy5.w && bullet4.y <= enemy5.y + enemy5.h && bullet4.y + bullet4.h> enemy5.y) {
    ehp5 -= damage
    bullet4.x = 800
    bullet4.y = 800
  }
  if (bullet5.x >= enemy5.x && bullet5.x <= enemy5.x + enemy5.w && bullet5.y <= enemy5.y + enemy5.h && bullet5.y + bullet5.h> enemy5.y) {
    ehp5 -= damage
    bullet5.x = 800
    bullet5.y = 800
  }
}
function die() {
  if (ehp1 <= 0) {
    enemy1.y = Math.min(enemy1.y, enemy2.y, enemy3.y, enemy4.y, enemy5.y) -200  * (1 +  enemySpeed/40)
    enemySpeed = enemySpeed  + Math.random() * 0.4
    damage = damage + Math.random() * 0.2
    ehp1 = 5
  }
  if (ehp2 <= 0) {
    enemy2.y = Math.min(enemy1.y, enemy2.y, enemy3.y, enemy4.y, enemy5.y) -200  * (1 +  enemySpeed/40)
    enemySpeed = enemySpeed  + Math.random() * 0.4
    damage = damage + Math.random() * 0.2
    ehp2 = 5
  }
  if (ehp3 <= 0) {
    enemy3.y = Math.min(enemy1.y, enemy2.y, enemy3.y, enemy4.y, enemy5.y) -200  * (1 +  enemySpeed/40)
    enemySpeed = enemySpeed  + Math.random() * 0.4
    damage = damage + Math.random() * 0.2
    ehp3 = 5
  }
  if (ehp4 <= 0) {
    enemy4.y = Math.min(enemy1.y, enemy2.y, enemy3.y, enemy4.y, enemy5.y) -200 * (1 +  enemySpeed/40)
    enemySpeed = enemySpeed  + Math.random() * 0.4
    damage = damage + Math.random() * 0.2
    ehp4 = 5
  }
  if (ehp5 <= 0) {
    enemy5.y = Math.min(enemy1.y, enemy2.y, enemy3.y, enemy4.y, enemy5.y) -200 * (1 +  enemySpeed/40)
    enemySpeed = enemySpeed  + Math.random() * 0.4
    damage = damage + Math.random() * 0.2
    ehp5 = 5
  }
}

function damagecap() {
  if (damage >=1.25) {
    damage = 1.25
  }
}
function speedcap() {
  if (enemySpeed >= speedCap ){
    enemySpeed = speedCap
  }
}
function shoot() {
  if (spaceKeyPressed == true) {
    if (bullet1fired == false && bulletTimer <= 0) {
      bullet1.x = pHitbox.x + pHitbox.w*(2/5)
      bullet1.y = pHitbox.y
      bullet1fired = true
      bullet5fired = false
      bulletTimer = 10
      console.log("1")
      }
      if (bullet2fired == false && bulletTimer <= 0) {
        bullet2.x = pHitbox.x + pHitbox.w *(2/5)
        bullet2.y = pHitbox.y
        bullet2fired = true
        bullet1fired = false
        bulletTimer = 10
        console.log("2")
      }
      if (bullet3fired == false && bulletTimer <= 0) {
        bullet3.x = pHitbox.x + pHitbox.w*(2/5)
        bullet3.y = pHitbox.y
        bullet3fired = true
        bullet2fired = false
        bulletTimer = 10
        console.log("3")
      }
      if (bullet4fired == false && bulletTimer <= 0) {
        bullet4.x = pHitbox.x + pHitbox.w*(2/5)
        bullet4.y = pHitbox.y
        bullet4fired = true
        bullet3fired = false
        bulletTimer = 10
        console.log("4")
      }
      if (bullet5fired == false && bulletTimer <= 0) {
        bullet5.x = pHitbox.x + pHitbox.w*(2/5)
        bullet5.y = pHitbox.y
        bullet5fired = true
        bullet4fired = false
        bulletTimer = 10
        console.log("5")
      }
     ;
  }
}
function bulletgoback() {
  if (bullet1.y <=0) {
    bullet1.x = 800
    bullet1.y = 800
  }
  if (bullet2.y <=0) {
    bullet2.x = 800
    bullet2.y = 800
  }
  if (bullet3.y <=0) {
    bullet3.x = 800
    bullet3.y = 800
  }
  if (bullet4.y <=0) {
    bullet4.x = 800
    bullet4.y = 800
  }
  if (bullet5.y <=0) {
    bullet5.x = 800
    bullet5.y = 800
  }
}


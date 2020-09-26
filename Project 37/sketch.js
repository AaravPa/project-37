var runner, runner_running;
var ground, obstacle, obstaclesGroup;

var score;

var PLAY = 1;

var END = 0;

var gameState = 1;


function preload(){
  runner_running = loadImage("runner.png");
  cactus = loadImage("cactus.png");
}

function setup() {
  createCanvas(displayWidth - 70, displayHeight);
  
  runner = createSprite(50,160,20,50);
  runner.addImage(runner_running);
  trex.setCollider("circle",10,20,5);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -7;
  
  invisibleGround = createSprite(200,184,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,70,20,20);
  gameOver.addImage("gameOver",gameOverim);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,100,20,20);
  restart.addImage("re", restartim);
  restart.scale = 0.5;
  restart.visible = false;
  
  score = 0;
}

function draw() {
  background(180);
  
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY) {
      score = score +    Math.round(getFrameRate()/60);
  
  if(keyDown("space") && trex.y >= 140) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

    if(trex.isTouching(obstaclesGroup)){
      gameState = END;
    }
    
  spawnObstacles();
    
  } else 
    if(gameState === END) {
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    trex.velocityY = 0;
    
    if(mousePressedOver(restart)){
    reset();
    }
}
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.addImage(cactus);
    obstacle.velocityX = -7;
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running", trex_running);
score = 0;
ground.velocityX = -7;
}
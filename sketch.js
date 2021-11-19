var bgImg;
var player,playerImg;
var obstacle,obstacleImg,obstacleGroup;
var gameOverImg;
var bullet,bulletImg,bulletGroup;
var asteroid,asteroidImg,asteroidGroup;
var score=0;
var enemy1,enemy1Img;
var enemy2,enemy2Img;
var edges;
var counter=0,counter2=0;
var lives=5;




function preload(){
bgImg = loadImage("assets/bg2.jpg")
playerImg=loadImage("assets/RockeTransparent.png")
obstacleImg=loadImage("assets/obsTop2.png")
gameOverImg=loadImage("assets/gameOver.png")
bulletImg=loadImage("assets/Bullet1.png")
asteroidImg=loadImage("assets/asteroid1.png")
enemy1Img=loadImage("assets/Alien spacecraft.png")
enemy2Img=loadImage("assets/Alien2.png")
}

function setup(){
createCanvas(1200,600);

player= createSprite(600,550);
player.addImage(playerImg);



obstacleGroup=new Group();
bulletGroup=new Group();
asteroidGroup=new Group();

edges=createEdgeSprites();
enemy();


}

function draw() {
  
  background(bgImg);
fill("black");
text("SCORE: "+score,1100,30);
text("LIVES LEFT: "+lives,50,30);

  spawnBirds();
  spawnAsteroids();

  enemy2.bounceOff(edges);
enemy1.bounceOff(edges);

  
  if(keyDown("space")){
   spawnBullets();
   
  }
    
  player.x=mouseX;

  player.bounceOff(edges[0]);
  player.bounceOff(edges[1]);

  if(bulletGroup.isTouching(asteroidGroup)){
    bulletGroup.destroyEach();
    asteroidGroup.destroyEach();
    score=score+5;
  }

  if(asteroidGroup.isTouching(player)){
    asteroidGroup.destroyEach();
    lives=lives-1;
  }
  
  if(enemy1.isTouching(player)){
    lives=lives-1;
  }

  if(enemy2.isTouching(player)){
    lives=lives-1;
  }

  if(lives===0){
    text("GAME OVER ",600,300);
    player.destroy();
    obstacleGroup.destroyEach();
    enemy1.destroy();
    enemy1.velocityY=0;
    enemy1.velocityX=0;
    enemy2.destroy();
    enemy2.velocityY=0;
    enemy2.velocityX=0;
    asteroidGroup.destroyEach();
  }

  if(bulletGroup.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    bulletGroup.destroyEach();
    lives=lives-1;
  }

  if(bulletGroup.isTouching(enemy1)){
    counter=counter+1;
    bulletGroup.destroyEach();
    if(counter>5){
      bulletGroup.destroyEach();
      enemy1.destroy();
      score=score+10;
    }
  }
  

  if(bulletGroup.isTouching(enemy2)){
    counter2=counter2+1;
    bulletGroup.destroyEach();
    if(counter>5){
      bulletGroup.destroyEach();
      enemy2.destroy();
      score=score+10;
    }
  }
          
   
        drawSprites();
        
}
function spawnBirds(){
  if(frameCount%300===0){
    obstacle= createSprite(1250,100);
    obstacle.addImage(obstacleImg);
    obstacle.y=Math.round(random(10,250));
    obstacle.scale=0.1;
    obstacle.velocityX=-2;
    obstacle.lifetime=700;
    obstacleGroup.add(obstacle);
    if(bulletGroup.isTouching(obstacleGroup)){
      bulletGroup.destroyEach;
      obstacleGroup.destroyEach;
    }
  }
}

function spawnBullets(){
  bullet=createSprite(600,480);
  bullet.x=player.x;
  bullet.velocityY=-2;
bullet.addImage(bulletImg)
bullet.scale=0.2
bulletGroup.add(bullet);

}

function spawnAsteroids(){
  if(frameCount%150===0){
  asteroid=createSprite(400,50);
  asteroid.velocityY=4;
  asteroid.x=Math.round(random(50,1150));
  asteroid.addImage(asteroidImg);
  asteroid.scale=0.25
  asteroidGroup.add(asteroid);
}

  
}

function enemy(){

enemy1=createSprite(50,Math.round(random(10,height-10)));
enemy1.velocityX=3;
enemy1.velocityY=5;
enemy1.addImage(enemy1Img);
enemy1.scale=0.7;


enemy2=createSprite(width-50,Math.round(random(10,height-10)));
enemy2.velocityX=-3;
enemy2.velocityY=-5;
enemy2.addImage(enemy2Img);
enemy2.scale=0.5;



}
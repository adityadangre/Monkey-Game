var score;

var bscore;

var bg, bg_img;

var monkey, monkey_running;

var bananaGroup, banana_img;

var stoneGroup, stone_img;

var ground;

var PLAY=0;

var END=1;

var gameState=PLAY;

var sc;

function preload(){
  
  bg_img = loadImage("jungle.jpg");
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  banana_img=loadImage("banana.png");
  
  stone_img=loadImage("stone.png");
  
}

function setup() {
  
  createCanvas(400,400);
  
  score=0;
  
  bscore=0;
  
  bg = createSprite(200,180,400,20);
  bg.addImage("bg",bg_img);
  bg.x = bg.width /2;
  bg.velocityX = -1;
  
  monkey=createSprite(100,350);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.09;
  
  ground=createSprite(200,380,400,10);
  ground.visible=false;
  
  bananaGroup=new Group();
  stoneGroup=new Group();
  
  sc=0;
  
}

function draw() {
  
  background("white");
  
  if(gameState===PLAY){
    spawnBanana();
    spawnStone();

    if (bg.x < 0){
      bg.x = bg.width/2;
    }

    if(keyDown("space") && monkey.collide(ground)) {
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.3;

    if(monkey.isTouching(bananaGroup)){
      bananaGroup.removeSprites();
      score=score+2;
      bscore=bscore+1;
      switch(score){
        case 10 : monkey.scale=0.11;
          break;
        case 20: monkey.scale=0.13;
          break;
          case 30 : monkey.scale=0.15;
          break;
        case 40:monkey.scale=0.17;
          break;
        case 50:monkey.scale=0.20;
          break;
        default : break;
      }
    }
    
    if(monkey.isTouching(stoneGroup)){
      sc=sc+1;
      switch(sc){
        case 1 : monkey.scale=0.09;
                score=score-2;
                stoneGroup.removeSprites();
            break;
          case 2: gameState=END
          break;
          default : break;
          
      }
  
      
    }

   
    monkey.collide(ground);
  }
  else
  if(gameState===END){
    bg.velocityX=0;
    monkey.velocityY=0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  
  
  fill("red");
  stroke("black");
  textSize(20);
  text("Score : "+score,260,30);
  
  fill("blue");
  stroke("black");
  textSize(20);
  text("Total Bananas : "+bscore,225,60);
  
  textSize(40);
  fill("yellow");
  stroke("black");
  strokeWeight(7);
  if(gameState===END)
    text("You Lost!",125,200)  
  
  
}

function spawnBanana() {
  
  if (frameCount % 120 === 0) {
    var banana = createSprite(400,200);
    banana.setCollider("rectangle",0,50,1000,300);
    banana.y = Math.round(random(200,300));
    banana.addImage(banana_img);
    banana.scale = 0.06;
    banana.velocityX = random(-3,-6);
    banana.lifetime = 200;
    bananaGroup.add(banana);
  } 
  
}

function spawnStone() {
  
  if (frameCount % 100 === 0) {   
    var stone = createSprite(400,340);
    stone.setCollider("rectangle",-10,0,400,350);
    stone.addImage(stone_img);
    stone.scale = 0.2;
    stone.velocityX = random(-4,-8);
    stone.lifetime = 200;
    stoneGroup.add(stone);
    monkey.depth=stone.depth;
    monkey.depth=monkey.depth+1;
  } 
  
}
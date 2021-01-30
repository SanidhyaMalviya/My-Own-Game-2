var player1,player2;
var wall,wall2,coin1Group,coin2Group,coin3Group,coin4Group,coin5Group;
var player1Score = 0;
var player2Score = 0;
var obstacleGroup;
var player1Life = 3;
var player2Life = 3;
var gameState = "play";
var gameState2 = "play";
var whoWon = "";
var target;

function preload(){
  maze = loadImage("maze.jpg");
  maze1 = loadImage("maze1.jpg");
  maze2 = loadImage("maze2.jpg");
}

function setup() {
  //createCanvas(displayWidth-15,displayHeight-130);
  createCanvas(windowWidth,windowHeight);
  console.log(innerWidth);
  console.log(innerHeight);

  wall = createGroup();
  wall2 = createGroup();
  coin1Group = createGroup();
  coin2Group = createGroup();
  coin3Group = createGroup();
  coin4Group = createGroup();
  coin5Group = createGroup();

  obstacleGroup = createGroup();

  //Horizontal walls
  wall.add(createSprite(width/2,height/4-143,width,20));
  wall.add(createSprite(width/4-240,height/2+50,150,20));
  wall.add(createSprite(width/2-60,height/1.2+20,400,20));
  wall.add(createSprite(width/5.8,height/1.45,180,20));
  wall.add(createSprite(width/4-105,height/2,180,20));
  wall.add(createSprite(width/4-45,height/2.5,300,20));
  wall.add(createSprite(width/4-45,height/3.25,300,20));
  wall.add(createSprite(width/3.81,height/8,420,20));
  wall.add(createSprite(width/2.45,height/4.6,450,20));
  wall.add(createSprite(width/2.78,height/1.46,160,20));
  wall.add(createSprite(width/2.78,height/2.05,160,20));
  wall.add(createSprite(width/2.2,height/1.7,160,20));
  wall.add(createSprite(width/2.2,height/1.3,160,20));
  wall.add(createSprite(width/2.2,height/3.25,160,20));
  wall.add(createSprite(width/1.65,height/1.45,250,20));
  wall.add(createSprite(width/1.55,height/8,150,20));
  wall.add(createSprite(width/1.55,height/3.2,150,20));
  wall.add(createSprite(width/1.36,height/4.5,110,20));
  wall.add(createSprite(width/1.42,height/2.5,500,20));
  wall.add(createSprite(width/1.2,height/3.25,130,20));
  wall.add(createSprite(width/1.26,height/2,270,20));
  wall.add(createSprite(width/1.345,height/1.7,400,20));
  wall.add(createSprite(width/1.45,height/1.3,260,20));
  wall.add(createSprite(width/1.19,height/1.138,150,20));
  
  //Vertical walls
  wall2.add(createSprite(width/4-310,height/2,20,height));
  wall2.add(createSprite(width-10,height/2,20,height));
  wall2.add(createSprite(width/2,height/6-50,20,63));
  wall2.add(createSprite(width/9.4,height/4.65,20,95));
  wall2.add(createSprite(width/9.45,height/2.2,20,50));
  wall2.add(createSprite(width/9.1,height/1.2,20,160));
  wall2.add(createSprite(width/4.25,height/1.7,20,130));
  wall2.add(createSprite(width/3.3,height/1.6,20,180));
  wall2.add(createSprite(width/2.5,height/2.8,20,50));
  wall2.add(createSprite(width/1.965,height/2.45,20,120));
  wall2.add(createSprite(width/2.42,height/1.35,20,50));

  for(var i=0;i<wall.length;i++){
    wall.get(i).addImage("wall1",maze1);
    wall.get(i).scale = 0.7;
  }
  for(var i=0;i<wall2.length;i++){
    wall2.get(i).addImage("wall2",maze2);
    wall2.get(i).scale = 0.7;
    console.log(wall2.get(i).x === width/4-310)
    if(wall2.get(i).x === width/4-310){
      console.log("wall2");
      wall2.get(i).scale = 0.3
      wall2.get(i).debug = true;
      //wall2.get(i).velocityY = 0.1;
    }
  }

  //Obstacles
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.add(createSprite(random(100,width-50),random(100,height-50),10,10));
  obstacleGroup.setColorEach("red");

  for(var i=0;i<obstacleGroup.length;i++){
    rand = Math.round(random(1,2))
    if(rand===2){
      obstacleGroup.get(i).velocityX = Math.round(random(-5,5));
    } else{
      obstacleGroup.get(i).velocityY = Math.round(random(-5,5));
    }
  }

  //Players
  player1 = new Player(width/6,height/2-200,10,10);
  player2 = new Player(width-80,height/2-200,10,10);

  target = createSprite(width/2.2,height/2,40,40);
  target.shapeColor = "yellow";
}

function draw() {
  background("white"); 

  push();
  fill("black");
  textSize(20);
  text(mouseX+" , "+mouseY,500,110);
  pop();

  scoringSystem();

  if(gameState === "play"){
    player1Movement();
    coins();
    coinCollection();
    obstacleMovement();
    obstacleCollision();

    if(player1Life === 0){
      gameState = "end";
    }

    if(player1.body.isTouching(target)){
      gameState2 = "end";
      gameState = "won";
    }
  } else if(gameState === "end"){

  } else if(gameState === "won"){
    textSize(40);
    text("Player1 Won the Game",width/2,height/2);
  }

  if(gameState2 === "play"){
    player2Movement();
    coins();
    coinCollection();
    obstacleMovement();
    obstacleCollision();
    if(player2Life === 0){
      gameState2 = "end";
    }
    if(player2.body.isTouching(target)){
      gameState2 = "won";
      gameState = "end";
    }

  } else if(gameState2 === "end"){

  } else if(gameState2 === "won"){
    textSize(40);
    text("Player2 Won the Game",width/2,height/2);
  }
  
  player1.display();
  player2.display();

  drawSprites();
}

function player1Movement(){
  if(keyDown("w")){
    player1.body.y = player1.body.y-3;
  }
  if(keyDown("s")){
    player1.body.y = player1.body.y+3;
  }
  if(keyDown("a")){
    player1.body.x = player1.body.x-3;
  }
  if(keyDown("d")){
    player1.body.x = player1.body.x+3;
  }
}

function player2Movement(){
  if(keyDown(UP_ARROW)){
    player2.body.y = player2.body.y-3;
  }
  if(keyDown(DOWN_ARROW)){
    player2.body.y = player2.body.y+3;
  }
  if(keyDown(LEFT_ARROW)){
    player2.body.x = player2.body.x-3;
  }
  if(keyDown(RIGHT_ARROW)){
    player2.body.x = player2.body.x+3;
  }
}

function coins(){
  if(frameCount%60===0){
    var coin1 = createSprite(random(0,width),random(0,height),15,15);
    coin1.lifetime = 120;
    coin1.shapeColor = "yellow";
    coin1Group.add(coin1);
  }
  if(frameCount%80===0){
    var coin2 = createSprite(random(0,width),random(0,height),15,15);
    coin2.lifetime = 110;
    coin2Group.add(coin2);
  }
  if(frameCount%100===0){
    var coin3 = createSprite(random(0,width),random(0,height),15,15);
    coin3.lifetime = 100;
    coin3Group.add(coin3);
  }
  if(frameCount%50===0){
    var coin4 = createSprite(random(0,width),random(0,height),15,15);
    coin4.lifetime = 100;
    coin4Group.add(coin4);
  }
  if(frameCount%120===0){
    var coin5 = createSprite(random(0,width),random(0,height),15,15);
    coin5.lifetime = 70;
    coin5Group.add(coin5);
  }
}

function coinCollection(){
  //Coin1 Group
  for(var i=0;i<coin1Group.length;i++){
    //Player1
    if(player1.body.isTouching(coin1Group.get(i))){
      player1Score+=1;
      coin1Group.get(i).destroy();
    }
    //Player2
    if(player2.body.isTouching(coin1Group)){
      player2Score+=1;
      coin1Group.get(i).destroy();
    }
  }  

  //Coin2 Group
  for(var i=0;i<coin2Group.length;i++){
    //Player1
    if(player1.body.isTouching(coin2Group.get(i))){
      player1Score+=1;
      coin2Group.get(i).destroy();
    }
    //Player2
    if(player2.body.isTouching(coin2Group)){
      player2Score+=1;
      coin2Group.get(i).destroy();
    }
  }  

  //Coin3 Group
  for(var i=0;i<coin3Group.length;i++){
    //Player1
    if(player1.body.isTouching(coin3Group.get(i))){
      player1Score+=1;
      coin3Group.get(i).destroy();
    }
    //Player2
    if(player2.body.isTouching(coin3Group)){
      player2Score+=1;
      coin3Group.get(i).destroy();
    }
  }  

  //Coin4 Group
  for(var i=0;i<coin4Group.length;i++){
    //Player1
    if(player1.body.isTouching(coin4Group.get(i))){
      player1Score+=1;
      coin4Group.get(i).destroy();
    }
    //Player2
    if(player2.body.isTouching(coin4Group)){
      player2Score+=1;
      coin4Group.get(i).destroy();
    }
  }  

  //Coin5 Group
  for(var i=0;i<coin5Group.length;i++){
    //Player1
    if(player1.body.isTouching(coin5Group.get(i))){
      player1Score+=1;
      coin5Group.get(i).destroy();
    }
    //Player2
    if(player2.body.isTouching(coin5Group)){
      player2Score+=1;
      coin5Group.get(i).destroy();
    }
  }  
}

function obstacleMovement(){
  obstacleGroup.bounceOff(wall);
}

function scoringSystem(){
  //Player1 Score
  push();
  fill("white");
  rect(80,580,115,25);
  fill("black");
  textSize(20);
  text("Score: "+player1Score,90,599);
  pop();

  //Player2 Score
  push();
  fill("white");
  rect(970,580,115,25);
  fill("black");
  textSize(20);
  text("Score: "+player2Score,980,599);
  pop();

  //Player1 life
  push();
  fill("white");
  rect(240,580,85,25);
  fill("black");
  textSize(20);
  text("Lifes: "+player1Life,250,599);
  pop();

  //Player2 life
  push();
  fill("white");
  rect(1090,580,85,25);
  fill("black");
  textSize(20);
  text("Lifes: "+player2Life,1100,599);
  pop();
}

function obstacleCollision(){
  //Player1
  if(player1.body.isTouching(obstacleGroup)){
    player1.body.x = width/6;
    player1.body.y = height/2-200;
    player1Life = player1Life-1;
  }

  //Player2
  if(player2.body.isTouching(obstacleGroup)){
    player2.body.x = width-80;
    player2.body.y = height/2-200;
    player2Life = player2Life-1;
  }
}
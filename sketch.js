var trex ,trexImg;
var ground, groundImg;
var grounded;
var cloud, cloudImg;
var maractus,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var gangueDoEspetinho;
var bipolar = "a.c";
var cloudGroup;
var quietus;
var score = 0;
var restart, restartImg;
var gameover, gameoverImg;
var checkpoint;
var morri;
var pulin;

function preload(){
  trexImg = loadAnimation("trex1.png","trex3.png","trex1.png","trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  quietus = loadImage("trex_collided.png");
  restartImg = loadImage("restart.png");
  gameoverImg = loadImage("gameOver.png");
  checkpoint = loadSound("checkpoint.mp3");
  morri = loadSound("die.mp3");
  pulin = loadSound("jump.mp3");


}

function setup(){
  createCanvas(windowWidth,windowHeight);
  

  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("corredor", trexImg);
  trex.scale = 0.4;
  trex.x = 40;

  //trex arregalado
  trex.addImage("OOF",quietus);

  //crie um chao maneiro
  ground = createSprite(69,height-10,width,10);
  ground.addImage("ground2.png",groundImg);

  bordas= createEdgeSprites();

  //plot twist: o chão na verdade era outro
  grounded = createSprite(69,height-2,width,10);
  grounded.visible=false;
  
  //sprite do gameover(texto)
  gameover = createSprite(width/2,height/2);
  gameover.addImage("quepena,vcperdeu", gameoverImg);
  gameover.visible=false;

  //sprite do restart(não é a banda)
  restart = createSprite(width/2,height/2+100);
  restart.addImage("bandaruim",restartImg);
  restart.visible=false;


  gangueDoEspetinho = new Group();
  cloudGroup = new Group();

  trex.debug=true;
  //trex.setCollider("rectangle",60,0,100,250,90);
  trex.setCollider("circle",0,0,40);
}


function draw(){
  background("white")

  text("score:"+score,490,20);


  //colisao com chão
   trex.collide(grounded);

   if(bipolar==="a.c"){
      cirrose();
      bohemianRhapsody();

      //Pulo do Trex
      if(touches.length>0||keyDown("space")&&trex.y>height-50){
      trex.velocityY = -22.5;
      pulin.play();
      touches = [];
     }
      //gravidade
      trex.velocityY = trex.velocityY +1.8;

     //velocidad do chão
     ground.velocityX=-(7+score/1000);
     if (ground.x<0){
     ground.x=ground.width/2;

     }
     //colisao com os cactos
      if (trex.isTouching(gangueDoEspetinho)){
      console.log("YOU LOSE");
      bipolar="d.c";
      morri.play();
     //trex.velocityY=-30;
     }
     score = score+Math.round(frameCount/75);
   
    }
   else if (bipolar==="d.c"){
    gangueDoEspetinho.setVelocityXEach(0);
    ground.velocityX=0;
    cloudGroup.setVelocityXEach(0);
    trex.velocityY=0;
    trex.changeAnimation("OOF",quietus);
    gangueDoEspetinho.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameover.visible=true;
    restart.visible=true;
    if (mousePressedOver(restart)){
      console.log("que pena, você perdeu...")
      awakenMyMasters()
    }
  }
  
  if (score%4570===0&&score>0){
    checkpoint.play();
  }
  
   drawSprites();

}

//crie nuvens
function cirrose() {
if(frameCount%50===0){
cloud = createSprite(width+20,10,30,30);
cloud.addImage(cloudImg);
cloud.scale=0.6;
cloud.velocityX=-(Math.round(random(3,8)));
cloud.y=Math.round(random(10,160));
cloud.depth=trex.depth;
trex.depth++;

//crie um tempo de vida para a nuvem
cloud.lifetime = width/30;
cloudGroup.add(cloud);
}}

//crie cactos
function bohemianRhapsody() {
  if(frameCount%80===0){
    maractus = createSprite(width+20,height-30,20,20);
    maractus.velocityX=-(7+score/1000);
    maractus.scale=0.5
    var cacnea = Math.round(random(1,6));
    //randomização de cactus
    switch(cacnea){
      case 1 :maractus.addImage("obstacle1",obstacle1);
      break;
      case 2 :maractus.addImage("obstacle1",obstacle2);
      break;
      case 3 :maractus.addImage("obstacle1",obstacle3);
      break;
      case 4 :maractus.addImage("obstacle1",obstacle4);
      break;
      case 5 :maractus.addImage("obstacle1",obstacle5);
      break;
      case 6 :maractus.addImage("obstacle1",obstacle6);
      break;
      default : break;
      }
      maractus.lifetime = width/30;
      maractus.depth=trex.depth;
      trex.depth++;
      gangueDoEspetinho.add(maractus);


  }


}

function awakenMyMasters(){
  bipolar = "a.c";
  score = 0;
  gangueDoEspetinho.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("corredor", trexImg);
  gameover.visible=false;
  restart.visible=false;
  //vamo de novo
}


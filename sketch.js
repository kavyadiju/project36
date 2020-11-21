var dog,dogImg,dogImg1,bg;
var database;
var foodS,foodStock;
var feedDogBtn,addFoodBtn;
var fedTime, lastFed;
var foodObj,food,foodS;
var currentTime;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
   bg=loadImage("Images/bg1.jpg");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1200,500);

  dog=createSprite(200,350,150,150);
  dog.addAnimation("dog1",dogImg);
  dog.addAnimation("dog2",dogImg1);
  dog.scale=0.3;

  
  feedDogBtn = createButton("Feed The Dog!");
  feedDogBtn.position(360, 70);
  feedDogBtn.mousePressed(feedDog);

  addFoodBtn = createButton("Add Food!");
  addFoodBtn.position(750, 70);
  addFoodBtn.mousePressed(addFoodS);

  foodObj = new Food();
  food = database.ref("Food");
  food.on("value", readStock);

  currentTime = hour();
}

// function to display UI
function draw() {
  background(bg);

  if (foodS === 0) {
    dog.changeAnimation("dog1", dogImg);
  }
 

  foodObj.display();

  fedTime = database.ref("LastFed");
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
 


  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,300,490);
  textSize(15);
  fill("purple");
  

    //lines to display the time for last fed
    if (lastFed >= 12) {
      text("Last Fed Time: " + lastFed % 12 + " PM", 10, 450);
    } else if (lastFed === 0) {
      text("Last Fed Time: 12 AM", 250, 50);
    } else {
      text("Last Fed Time: " + lastFed + " AM", 10, 450);
    }
}


//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  if (foodS < 0) {
    foodS = 0
  }
}

function feedDog() {
  dog.changeAnimation("dog2",dogImg1);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    LastFed: hour()
  })
}


function addFoodS() {
  foodS++
  database.ref("/").update({
    Food: foodS
  })
}

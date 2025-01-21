

//import { Player } from "./Classes/Player.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//canvas variables
var canvasHeight = window.innerHeight-16;
var canvasWidth = window.innerWidth-16;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Layers 
var AllLayers = [];
var BackgroundLayer = [];
var PlayerLayer;
var EnemeyLayer;
var TerrainLayer;
var UILayer;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//main objects
var PlayerObj;
var ListOfActors = [];
var ListOfEnemies = [];
var ListOfObstacles = [];
var ListOfProjectiles = [];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Math functions
function LookAtDirection(target,position) {
    let angle = atan2(target.y - position.y, target.x - position.x);
    return angle;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Background scene
var alp = 0;
var a = 0;
var rainx = 0;
var rainy = 0;
var rainadd = 0;
function BackgroundScene()
{
    //movementIllusion++;
    //background + effect
    alp += 1.5; 
    a = Math.floor(Math.sin(alp)*100);
    background(0,0,30,a);
    /////////////////////////////////////////////////////////////////////
    //stars
    for (let i = 0; i < 10; i++) {
        noStroke();
        fill(255,0,random(255),random(50,255));
        sizeStars = random(6);
        rect(random(canvasWidth),random(canvasHeight),sizeStars,sizeStars);
    }
    /////////////////////////////////////////////////////////////////////////
    //rain
    for (let i = 0; i < 30; i++) {
        rainx = random(canvasWidth);
        rainy = random(canvasWidth);
        rainadd = random(80);
        stroke(150,random(150,255));
        line(rainx,rainy,rainx+rainadd,rainy+rainadd);
    }
    /*
    //moon
    fill(255);
    stroke(0);
    circle(canvasWidth/2, canvasHeight/2 , 100);

    //overlapping navy circle for crescent moon
    stroke("navy");   
    fill("navy");
    circle(320,50,100);
    */
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload() 
{

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//button and GUI set up 
//btn = button
let StartPlayBtn,SettingBtn,ShowScoreBtn,Title;
let ListOfUIObjects = [];
function SetUpUI()
{
    //
    /*
    Title = text('rainbows', (canvasWidth/2-50) , (canvasHeight/2));
    Title.fill(150,15,60);
    Title.textFont()
    ListOfUIObjects.push(Title);
    */
    //start button
    StartPlayBtn = createButton("Play");
    StartPlayBtn.style('fontFamily: Arial, Helvetica, sans-serif');
    StartPlayBtn.size(120, 30);
    StartPlayBtn.position((canvasWidth/2 - 60) , (canvasHeight/2 - 15) );
    StartPlayBtn.style('font-size', '15px');
    //set up linked function
    StartPlayBtn.mouseClicked(StartPlayingProcedure);
    ListOfUIObjects.push(StartPlayBtn);
    
    /*
    ///
    //Show Score button
    SettingBtn = createButton("Settings");
    SettingBtn.style('fontFamily:  Arial, Helvetica, sans-serif; border:15;');
    SettingBtn.size(120, 30);
    //SettingBtn.
    SettingBtn.position((canvasWidth/2 - 60), (canvasHeight/2 - 15) + 35);
    SettingBtn.style('font-size', '15px');
    //set up linked function
    SettingBtn.mouseClicked(CreateSettingsUI);
    ListOfUIObjects.push(SettingBtn);

    ///
    //Show Score button
    ShowScoreBtn = createButton("Score Board");
    ShowScoreBtn.style('fontFamily: Arial, Helvetica, sans-serif');
    ShowScoreBtn.size(120, 30);
    ShowScoreBtn.position((canvasWidth/2 - 60), (canvasHeight/2 - 15) + 70 );
    ShowScoreBtn.style('font-size', '15px');
    //set up linked function
    ShowScoreBtn.mouseClicked(ShowScoreButton);
    ListOfUIObjects.push(ShowScoreBtn);*/


}

function RemoveAllUI() 
{
    for (const UIObeject of ListOfUIObjects) {
        UIObeject.remove();
    }
}

function CreateSettingsUI() {
    
}

function StartPlayingProcedure() 
{
    //StartPlayBtn.remove();
    RemoveAllUI();
    PlayerObj = new Player(100,100);
    ListOfActors.push(PlayerObj);
    var NewEnemy = new Enemy(createVector(50,50),0.01,500);
    ListOfActors.push(NewEnemy);
    ListOfEnemies.push(NewEnemy);
    ListOfObstacles.push(new Terrain(createVector(150, canvasHeight - 150),createVector(250,50)));
    ListOfObstacles.push(new Terrain(createVector(canvasWidth - 150, canvasHeight - 150),createVector(250,50)));
    //console.log(ListOfActors);
}

function ShowScoreButton() 
{
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() 
{
    //frameRate(120);
    var backgroundColor = createCanvas(canvasWidth,canvasHeight);
    //BackgroundLayer.push(backgroundColor);
    SetUpUI();
    //ellipseMode(CENTER);
    //rectMode(CENTER);
    rectMode(CENTER);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//draw function works every frame (can be changed) 
//inside the draw function things are drawn one by from top to bottom offoring access to layering ability
function ShowFps() 
{
    // Get the current frame rate
    // and display it.
    let fps = frameRate();
    //text(fps, 50, 50);
    console.log(fps);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//update function
function draw() 
{
    //Title.show();
    BackgroundScene();
    DrawTerrain();
    DrawActors();
    DrawProjectiles();

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawTerrain() 
{
    ListOfObstacles.forEach(element => {
        element.draw();
    });    
}

function DrawActors() 
{
    for (const Actor of ListOfActors) {
        Actor.Update();
    }
}

function GameOver() 
{
        
}

function DrawProjectiles() 
{
    ListOfProjectiles.forEach(element => {
        element.Update()
        if(element.isOutOfBounds() || element.isCollidingWithActor() || element.isCollidingWithTerrain())
        {
            // Find the index of 'cherry'
            let index = ListOfProjectiles.indexOf(element);

            if (index !== -1) {
                // Remove 'cherry' if it exists
                ListOfProjectiles.splice(index, 1);
            }
            //console.log(MMProjectilelist);
        }
        //console.log(element.ProjectileLocation);
    });
}

function DrawAllLayers()
{

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//input related
function keyPressed() 
{
    /*
    if (PlayerObj !== null) 
    {
        if (key === 'z') 
        {
            // Code to run.
        }
    }
    */
}

function keyReleased() 
{
    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var canvasHeight = window.innerHeight-16;
var canvasWidth = window.innerWidth-16;
let EnemyArray = [];
var onOff = false;
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    var e1 = new Enemy(createVector(50,50),0.01,500);
    EnemyArray.push(e1);
}

function draw() {
    background(220);
    if(onOff==true){
		translate(random(-5,5),random(-5,5));
	}
    renderAllenemeies();
}

function renderAllenemeies()
{
    EnemyArray.forEach(element => {
        element.Update();
    });
}




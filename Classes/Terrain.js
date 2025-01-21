class Terrain {
    TerrainLocation = createVector(0,0);
    TerrainSize = createVector(0,0);
    TerrainCollisionObject;
    
    constructor(location,size) 
    {
        this.TerrainLocation = location;
        this.TerrainSize = size;
        this.TerrainCollisionObject= new RectCollision(this.TerrainLocation,this.TerrainSize,false);
    }
    draw()
    {
        noStroke();
        fill(255);
        rect(this.TerrainLocation.x,this.TerrainLocation.y,this.TerrainSize.x,this.TerrainSize.y);
        //TerrainCollisionObject = new RectCollision(this.TerrainLocation,this.TerrainSize,false);

    }
}
class Projectile
{
    ProjectileLocation = createVector(0,0);
    ProjectileDirecion = createVector(0,0);
    ProjectileSize = createVector(0,0);
    ProjectileSpeed = 0.0;
    ProjectileShape;
    ProjectileCollision = new RectCollision(this.ProjectileLocation,this.ProjectileSize,false);
    Spawner = false;
    Projectilecolor ;
    constructor(location,size,speed,direction,Spawner,Color)
    {
        //set up projectile location
        this.ProjectileLocation = location;
        //set up projectile direction
        this.ProjectileDirecion = direction;
        //set up projectile size  
        this.ProjectileSize = size;
        //set up projectile speed
        this.ProjectileSpeed = speed;
        //set up projectile collision
        this.ProjectileCollision.RectCollisionLocation.x = location.x;
        this.ProjectileCollision.RectCollisionLocation.y = location.y;
        this.ProjectileCollision.RectCollisionSize.x = size;
        this.ProjectileCollision.RectCollisionSize.y = size;
        //the actor that spawned the projectile if true means player if false means enemy
        this.Spawner = Spawner;
        this.Projectilecolor = Color;
    }

    Update()
    {
        this.ProjectileLocation.x += this.ProjectileDirecion.x * this.ProjectileSpeed;
        this.ProjectileLocation.y += this.ProjectileDirecion.y * this.ProjectileSpeed;
        this.ProjectileCollision.UpdateLocation(this.ProjectileLocation.x, this.ProjectileLocation.y);
        noStroke();
        fill(this.Projectilecolor);
        rect(this.ProjectileLocation.x, this.ProjectileLocation.y, this.ProjectileSize, this.ProjectileSize);
    }

    isOutOfBounds()
    {
        if(this.ProjectileLocation.x < 0 || this.ProjectileLocation.x > canvasWidth || this.ProjectileLocation.y < 0 || this.ProjectileLocation.y > canvasHeight)
        {
            return true;
        }
    }
    isCollidingWithTerrain()
    {
        var ok = false;
        ListOfObstacles.forEach(element => {
            ok = this.ProjectileCollision.CheckCollision(element.TerrainCollisionObject);
        });
        return ok;
    }
    isCollidingWithActor()
    {
        if (this.Spawner) 
        {
            var ok = false;
            ListOfEnemies.forEach(element => {
                ok = this.ProjectileCollision.CheckCollision(element.CollisionObject);
                if (ok) {
                    element.hitEffect();
                }
            });
            return ok;
        }
        else
        {
            if (this.ProjectileCollision.CheckCollision(PlayerObj.CollisionObject)) 
            {
                PlayerObj.hitEffect();
                return true;
            }
            return false;
        }
    }
    
}
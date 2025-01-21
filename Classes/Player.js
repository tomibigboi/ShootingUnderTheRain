
class Player extends Actor
{
    HealthValue = 0.0;
    MaxHealthValue = 0.0;
    //player bounds 
    PLayerSize = createVector(50,50);
    //movement controls
    PlayerGroundDrag = 0.8;
    PlayerAirDrag = 0.6;
    PlayerMovemntSpeed = 20.0;
    //gravity
    PlayerGravityDirection = createVector(0.0,1.0);
    PlayerGravityScaler = 7.0;
    //jump force
    PlayerJumpForce = 110;
    //state flags
    isdashing = true;
    isFalling = false;
    isGrounded = false;
    isJumping = false;
    isOnPlatform = false;
    isCollidingWithTerrain = false;
    //velocity 
    PlayerVelocity = createVector(0.0,0.0); 
    //collision object
    CollisionObject = new RectCollision(this.ActorLocation,this.PLayerSize,false);
    SwipeCorrection = createVector(0,0);
    Hitobject;
    //Projectiles
    MaxProjectiles = 20;
    delayOnLunchProjectile = 0.5;
    //UI
    score = 0.0
    //constructor
    constructor(HealthValue,MaxHealthValue)
    {
        super();
        this.HealthValue = HealthValue;
        this.MaxHealthValue = MaxHealthValue;
        this.ActorLocation = createVector(350,350);
    }
    hitEffect()
    {
        this.HealthValue = this.HealthValue - 5;
        noStroke();
        fill(255,255,255);
        rect(this.ActorLocation.x,this.ActorLocation.y,this.PLayerSize.x,this.PLayerSize.y);
        if (this.HealthValue <= 0) 
        {
            //ListOfActors.indexOf(PlayerObj);
            let index = ListOfActors.indexOf(PlayerObj);

            if (index !== -1) {
                // Remove 'cherry' if it exists
                ListOfActors.splice(index, 1);
            }

        }
    }
    DrawHealthBar()
    {   
        var UiPos = this.MaxHealthValue;
        fill(255,255,255);
        rect(70 + UiPos, 50 ,this.MaxHealthValue, 50);
        noStroke();
        fill(255,0,0);
        rect(70 + UiPos, 50,this.HealthValue, 50);

    }
    addScore()
    {
        this.score += 50;
    }
    DrawScore()
    {
        let score = this.score;
        textSize(20,20);
        text(score, canvasWidth - 150, 50);
    }
    Update()
    {
        this.DrawScore();
        this.DrawHealthBar();
        noStroke();
        fill(150,60,80);
        this.CollisionObject.UpdateLocation(this.ActorLocation.x, this.ActorLocation.y);
        rect(this.ActorLocation.x,this.ActorLocation.y,this.PLayerSize.x,this.PLayerSize.y);
        this.PlayerInput();
        this.PlayerMovementLogic();

        //update collision object
        //this.CollisionObject.CheckCollisionOnList(ListOfEnemies)
        //terrain detection

    }
    ProjectileDirectionCalc()
    {
        var src = createVector(this.ActorLocation.x, this.ActorLocation.y); // Source point
        var direction = createVector(mouseX, mouseY); // Direction point
        // Calculate the direction vector
        var directionVector = direction.sub(src);// Subtract source from direction
        // Normalize the direction vector
        directionVector.normalize();
        return directionVector;
    }
    PlayerInput()
    {
        //right or d
        if (keyIsDown(81)) 
        {
            this.PlayerVelocity.x = -this.PlayerMovemntSpeed;
        }
        //left or q
        if (keyIsDown(68)) 
        {
            this.PlayerVelocity.x = this.PlayerMovemntSpeed;
        }
        //jump or up
        if (keyIsDown(90) && !this.isFalling) 
        {
            this.PlayerVelocity.y = -this.PlayerJumpForce;
            this.isJumping = true;
        }
        //dash
        if (keyIsDown(65)) 
        {
            this.PlayerVelocity.x = this.PlayerVelocity.normalize().x * 150;
            this.isJumping = true;
        }
        if (mouseIsPressed) 
        {
            var direction = this.ProjectileDirectionCalc();
            var alteredpos = createVector(0,0);
            alteredpos.x = this.ActorLocation.x;
            alteredpos.y = this.ActorLocation.y;
            var SpawnPrjectile = new Projectile(alteredpos,5,20 ,direction,true,color(255,255,255,150));
            ListOfProjectiles.push(SpawnPrjectile);
            //console.log("mouse");
        }
    }

    // movement related
    CheckIsOnTheGround() 
    {
        if (this.ActorLocation.y < canvasHeight - this.PLayerSize.y/2) 
        {
            return false;
        }
        return true;
    }
    CheckiIsCollidingWithTerrain()
    {
        var ok;
        ListOfObstacles.forEach(element => {
            if (this.CollisionObject.CheckCollision(element.TerrainCollisionObject)) 
            {
                this.isCollidingWithTerrain = true;
                this.SwipeCorrection = this.CollisionObject.getCollisionDirection(this.CollisionObject, element.TerrainCollisionObject);
                this.Hitobject = {location : element.TerrainCollisionObject.RectCollisionLocation ,size : element.TerrainCollisionObject.RectCollisionSize};
                ok = true;
            }
        });
        if (ok) 
        {
            return true;
        }
        this.isCollidingWithTerrain = false;
        return false;
    }
    
    PlayerMovementLogic()
    {


        //calculate air drag on Y
        if(this.isFalling)
        {
            this.PlayerVelocity.x *= this.PlayerAirDrag;
        }
        else
        {
            this.PlayerVelocity.x *= this.PlayerGroundDrag;
        }
        //apply velocity
        this.ActorLocation.y += this.PlayerVelocity.y;
        this.ActorLocation.x += this.PlayerVelocity.x;
        //Gravity
        if (this.CheckiIsCollidingWithTerrain()) 
        {
            //top stick
            if (this.SwipeCorrection.y == -1) 
            {
                this.isFalling = false;
                this.isOnPlatform = true;
                //this.PlayerVelocity.y = 0;
                if (this.PlayerVelocity.y >= 0)
                {
                    this.ActorLocation.y = this.Hitobject.location.y  - (this.Hitobject.size.y / 2 + this.PLayerSize.y / 2);  
                    //this.PlayerVelocity.y = 0;
                }
            }
            //bottom release
            else if (this.SwipeCorrection.y == 1) 
            {
                this.PlayerVelocity.y = 0;
                this.ActorLocation.y = this.Hitobject.location.y  + (this.Hitobject.size.y / 2 + this.PLayerSize.y / 2) + 10;
            }
            //right release
            if (this.SwipeCorrection.x == 1) 
            {
                this.PlayerVelocity.x *= -1;
                this.ActorLocation.x = this.Hitobject.location.x  + (this.Hitobject.size.x / 2 + this.PLayerSize.x / 2) + 10;
            }
            //left release
            else if (this.SwipeCorrection.x == -1) 
            {
                this.PlayerVelocity.x *= -1;
                this.ActorLocation.x = this.Hitobject.location.x  - (this.Hitobject.size.x / 2 + this.PLayerSize.x / 2) - 10;
            }
        }
        else if (this.CheckIsOnTheGround()) 
        {
            this.ActorLocation.y = canvasHeight - this.PLayerSize.y/2 ;
            this.PlayerVelocity.y = 0;
            this.isFalling = false;
            this.isGrounded = true;
            this.isJumping = false;
            this.isOnPlatform = false;
            this.isCollidingWithTerrain = false;
            //this.OffesetActorPosition(this.PlayerGravityDirection.mult(this.PlayerGravityScaler));
        }
        else
        {
            //calculate velocity
            this.PlayerVelocity.y *= this.PlayerAirDrag;
            this.PlayerVelocity.y += this.PlayerGravityDirection.y * this.PlayerGravityScaler;
            this.isGrounded = false;
            this.isFalling = true;
            this.isOnPlatform = false;
        }

        if (this.ActorLocation.x > canvasWidth) 
        {
            this.ActorLocation.x -= canvasWidth;
        } 
        else if (this.ActorLocation.x + this.PLayerSize.x / 2 < 0) 
        {
            this.ActorLocation.x += canvasWidth;
        }
    
    }
    ShootProjectiles()
    {
        
    }
}
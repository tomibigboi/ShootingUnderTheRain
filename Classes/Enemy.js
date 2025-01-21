class Enemy extends Actor {
    HealthValue = 0.0;
    MaxHealthValue = 0.0;
    //Enemy bounds 
    EnemySize = createVector(50,50);
    EnemyMovemntSpeed = 20.0;
    //velocity 
    EnemySpeed = 0.0; 
    //collision object
    CollisionObject = new RectCollision(this.ActorLocation,this.EnemySize,false);
    SwipeCorrection = createVector(0,0);
    Hitobject;
    //Projectiles
    MaxProjectiles = 20;
    delayOnLunchProjectile = 0.5;
    //movement variabls
    //points for enemey to follow
    EnemyPath =  [];
    index = 0; // Current point index
    t = 0; // Interpolation factor
    isDead = false;
    //attack vars
    attacktimer = 0.0;
    shouldAttack = false;
    constructor(size,speed,MaxHealthValue) 
    {
        super();
        this.MaxHealthValue = MaxHealthValue;
        this.HealthValue = MaxHealthValue;
        this.EnemySize = size;
        this.EnemySpeed = speed;
        // Define points to move through
        this.EnemyPath.push(createVector(canvasWidth / 2, 150));
        this.EnemyPath.push(createVector(150, canvasHeight / 2));
        this.EnemyPath.push(createVector(canvasWidth / 2, canvasHeight - 150));
        this.EnemyPath.push(createVector(canvasWidth - 150, canvasHeight / 2));
    }

    Update()
    {
        this.attacktimer += deltaTime;
        if (this.attacktimer >= 10) 
        {
            this.attacktimer = 0.0;
            this.shouldAttack = !this.shouldAttack;
        }
        if (this.shouldAttack) 
        {
            this.EnemyAttack();
        }
        noStroke();
        fill(255,0,50);
        rect(this.ActorLocation.x,this.ActorLocation.y,this.EnemySize.x,this.EnemySize.y);
        this.Movement();
    }

    Movement()
    {
        // Calculate the position using lerp
        let nextIndex = (this.index + 1) % this.EnemyPath.length;
        this.ActorLocation.x = lerp(this.EnemyPath[this.index].x, this.EnemyPath[nextIndex].x, this.t);
        this.ActorLocation.y = lerp(this.EnemyPath[this.index].y, this.EnemyPath[nextIndex].y, this.t);
        // Update the interpolation factor
        this.t += this.EnemySpeed;
        if (this.t > 1) {
            this.t = 0; // Reset for the next segment
            this.index = nextIndex; // Move to the next point
        }
    }
    hitEffect()
    {
        this.HealthValue = this.HealthValue - 5;
        PlayerObj.addScore();
        noStroke();
        fill(255,255,255);
        rect(this.ActorLocation.x,this.ActorLocation.y,this.EnemySize.x,this.EnemySize.y);
    }

    EnemyAttack()
    {
        var direction = createVector(0,0);
        /*switch (round(random(1,4))) 
        {
            case 1:
            break;
            case 2:
                direction = createVector(-1,0);
            break;
            case 3:
                direction = createVector(0,-1);
            break;
            case 4:
                direction = createVector(0,1);
            break;
        }*/
        direction = createVector(0,1);
        var alteredpos = createVector(0,0);
        alteredpos.x = this.ActorLocation.x;
        alteredpos.y = this.ActorLocation.y;
        console.log(direction);
        var SpawnPrjectile = new Projectile(alteredpos,5,10,direction,false,color(255,0,0));
        ListOfProjectiles.push(SpawnPrjectile);
    }

    dead()
    {
        if (this.HealthValue <= 0) 
        {
            this.isDead = true;
        }
    }
}
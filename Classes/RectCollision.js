class RectCollision extends Collision {
    RectCollisionSize = createVector(0,0);
    RectCollisionLocation = createVector(0,0);
    CollisionHitDirection = createVector(0,0);
    constructor(location,size,debug) 
    {
        super();
        this.RectCollisionSize = size;
        this.RectCollisionLocation = location;
        this.ActiveDebugView = debug;
    }
    DebugView(color)
    {
        rectMode(CENTER);
        stroke(color);
        strokeWeight(2);
        noFill();
        rect(this.RectCollisionLocation.x,this.RectCollisionLocation.y,this.RectCollisionSize.x,this.RectCollisionSize.y);
        //rotate(10,createVector(0,1));        
    }
    
    Update(AllColliders)
    {
        if(this.ActiveDebugView)
        {
            this.DebugView();
        }
        this.CollisionHitDirection = this.CheckCollisionOnList(AllColliders);
    }

    getCollisionDirection()
    {
        return this.CollisionHitDirection;
    }

    CheckCollisionOnList(AllColliders)
    {
        AllColliders.forEach(Collider => 
        {
            if (Collider != this) 
            {
                if (this.CheckCollision(Collider))
                {
                    return this.getCollisionDirection(this,Collider);
                }
                else
                {
                    return createVector(0,0);
                }
            }
        });
    }
    
    // Function to check collision and determine direction
    getCollisionDirection(r1, r2) 
    {
        // Calculate half dimensions
        let halfWidth1 = r1.RectCollisionSize.x / 2;
        let halfHeight1 = r1.RectCollisionSize.y / 2;
        let halfWidth2 = r2.RectCollisionSize.x / 2;
        let halfHeight2 = r2.RectCollisionSize.y / 2;

        // Calculate the center positions
        let center1X = r1.RectCollisionLocation.x;
        let center1Y = r1.RectCollisionLocation.y;
        let center2X = r2.RectCollisionLocation.x;
        let center2Y = r2.RectCollisionLocation.y;

        // Calculate the overlap on both axes
        let overlapX = (halfWidth1 + halfWidth2) - Math.abs(center1X - center2X);
        let overlapY = (halfHeight1 + halfHeight2) - Math.abs(center1Y - center2Y);

        // Determine the direction of the collision
        if (overlapX < overlapY) {
            // Collision is more horizontal
            if (center1X < center2X) {
                return createVector(-1,0); // rect1 is to the left of rect2
            } else {
                return createVector(1,0); // rect1 is to the right of rect2
            }
        } else {
            // Collision is more vertical
            if (center1Y < center2Y) {
                return createVector(0,-1); // rect1 is above rect2
            } else {
                return createVector(0,1); // rect1 is below rect2
            }
        }
    }
    // Function to check if two rectangles overlap
    CheckCollision(RectX) 
    {
        //half height of this rectangle
        const halfWidth1 = this.RectCollisionSize.x / 2;
        const halfHeight1 = this.RectCollisionSize.y / 2;
        //half height rectangle x
        const halfWidth2 = RectX.RectCollisionSize.x / 2;
        const halfHeight2 = RectX.RectCollisionSize.y / 2;

        return !(this.RectCollisionLocation.x - halfWidth1 > RectX.RectCollisionLocation.x + halfWidth2 ||
                this.RectCollisionLocation.x + halfWidth1 < RectX.RectCollisionLocation.x - halfWidth2 ||
                this.RectCollisionLocation.y - halfHeight1 > RectX.RectCollisionLocation.y + halfHeight2 ||
                this.RectCollisionLocation.y + halfHeight1 < RectX.RectCollisionLocation.y - halfHeight2);

    }

    UpdateLocation(x,y)
    {
        this.RectCollisionLocation = createVector(x,y);
    }

}
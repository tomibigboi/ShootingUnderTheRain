class Actor {
    ActorLocation = createVector(0,0);
    constructor() {
        //.set(0,0);
    }
    /**set the player location using a 2d vector**/
    set ActorLocation(position){
        this.ActorLocation.x = position.x;
        this.ActorLocation.y = position.y;
    }
    /**add to the player location using a 2d vector**/
    OffesetActorPosition(position)
    {
        this.ActorLocation.x += position.x;
        this.ActorLocation.y += position.y;
    }
    Update()
    {
        
    }
}
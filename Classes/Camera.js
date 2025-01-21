class Camera {
    constructor() 
    {
        this.CameraObject = createCamera();
        this.CameraLocation = createVector(0,0);
    }
    
    set SetCameraLocation(position)
    {
        this.CameraPosition = position;
        this.CameraObject.setPosition(position.x,position.y);
    }

    get GetCameraLocation()
    {
        return this.CameraLocation;
    }

    CameraLookAt()
    {
        // Point the camera at the origin.
        cam.lookAt(0, 0, 0);
    }
}
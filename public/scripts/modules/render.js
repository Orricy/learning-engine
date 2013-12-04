define(['event_bus'], function(eventBus) {
    
    /*******************************************************************************************************
        It deals of horizontal animation :
        the currentFrameY has to be change by the user when he want the animation to change.
        For exemple on a mouvement, the y will be top, left, right or bottom, the x made the things move.
    *******************************************************************************************************/
    function addRenderCapabilities (object,x,y,spritesheet,nb_of_frame,currentFrameX,currentFrameY,frameWidth,frameHeight,width,height)
    {
        object.prototype.render = function ()
        {
            context.drawImage(spritesheet,currentFrameX,currentFrameY,frameWidth,frameHeight,x,y,width,height);
        }
        object.prototype.animate = function ()
        {
            //the f is time frame, to fluidify the animation
            this.f++;
            if(this.f%6==0)
            {
                currentFrameX+=frameWidth;
                if(currentFrameX>=(nb_of_frame*frameWidth))
                {
                    currentFrameX = 0;
                }
            }
        }
    }
    /*************************************************************
                --------    Exemple of params   --------
    {   x : 100,
        y : 200,
        spritesheet     : '../asset/character.png',
        nb_of_frame     : 4,
        currentFrameX   : 0,
        currentFrameY   : 2,
        frameWidth      : 24,
        frameHeight     : 32,
        width           : 24,
        height          : 32
    }
    *************************************************************/
    eventBus.on('init', function (object,params) {
        var object = object;
        //position of the sprite in the canvas
        var x = params.x || 0;
        var y = params.y || 0;
        //image file
        var spritesheet = params.img;   //required
        //total number of horizontal frames
        var nb_of_frame = params.nb_of_frame || 0;
        //the frame where the animation begin
        var currentFrameX = params.currentFrameX || 0;
        var currentFrameY = params.currentFrameY || 0;
        //the size of the animation frame on the spritesheet
        var frameWidth = params.frameWidth; //required
        var frameHeight = params.frameHeight;   //required
        //the size of the final image on the canvas
        var width = params.widht || frameWidth;
        var height = params.height || frameHeight;

        addRenderCapabilities(object,x,y,spritesheet,nb_of_frame,currentFrameX,currentFrameY,frameWidth,frameHeight,width,height);
    });   
});
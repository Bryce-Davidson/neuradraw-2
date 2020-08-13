class AssetController {
    constructor(name, asset, In, Out) {
        this.name = name;
        this.asset = asset;
        this.In = In;
        this.Out = Out;
    }
    
    drawFrame(i) {
        // or, the animations have to take up a portion of the in out time
        // if the animation takes longer than the duration throw an error 

        // somehow this thing needs access to all of the drawing_configs
        if((!this.In  && !this.Out) || (i >= this.In && i <= this.Out)) {
            // call draw on the asset taking in a frame loop
            this.asset.draw({
                // set up the drawing config here to reference i
                // somehow control the drawing_config from here
            });
        }
    };
}

module.exports = AssetController;
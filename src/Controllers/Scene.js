import AssetController from './AnimationController';

export default class Scene {
    /**
     * 
     * @param {String} name - the name of the scene
     * @param {[AssetController]} assets - the array of assets in the scene
     * @param {Number} fps - The frames per second for the scene 
     * @param {*} duration - The duration of the scene in miliseconds (1000 miliseconds = 1 second)
     */
    constructor(name, assets, fps, duration) {

        // this is stuff you need to enforce with typescript
        // look into typescritpt

        this.name = name;
        this.assets = assets;
        this.fps = fps;
        this.duration = duration;
        
        this.num_frames = Math.round(fps * duration/1000);
        this.frameIn;
        this.frameOut;
    }

    set_in(frameIn) {
        this.frameIn = frameIn;
        this.frameOut = this.frameIn + Math.round(this.fps * this.duration/1000);
    }

    /**
     * 
     * @param {Number} frame - The current frame of the animation timeline
     */
    timeline(frame) {
        // make sure to call the asset timelines relative to the scene
        if((frame >= this.frameIn && frame <= this.frameOut)) {
            for(var i=0; i < this.assets.length; i++) {
                this.assets[i].timeline(frame - this.frameIn);
            }
        }
    }

    /**
     * 
     * @param {AssetController} asset - The drawing asset to be added to the scene
     */
    add_asset(asset) {
        // if the asset out is past the duration of the scene then warning
        // get duration of asset
        if(asset.frameOut > this.frameOut) {
            console.warn(
                `
                    Asset: ${asset.name} is clipping the end of the scene \n 
                    Please change ${asset.name}.frameOut to be \n
                    less than or equal to ${this.name}.frameOut
                `)
        }
        this.assets.push(asset);
    }
}
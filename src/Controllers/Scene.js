export default class Scene {
    /**
     * 
     * @param {String} name - the name of the scene
     * @param {Array} assets - the array of assets in the scene
     * @param {Number} fps - The frames per second for the scene 
     * @param {*} duration - The duration of the scene in miliseconds (100 miliseconds = 1 second)
     */
    constructor(name, assets, fps, duration) {
        this.name = name;
        this.assets = assets;
        this.num_frames = Math.round(Fps * duration/1000);
    }

    /**
     * 
     * @param {Number} frame - The current frame of the animation timeline
     */
    timeline(frame) {
        // loop through the assets and give them a frame
        for(var i=0; i < this.assets.length; i++) {
            // if the timeline frame stops the asset should stop drawing
            // seems the timeline should only really trigger the drawing function
            // if there has been a change
            this.assets[i].timeline(frame);
        }
    }

    /**
     * 
     * @param {Asset} asset - The drawing asset to be added to the scene
     */
    add_asset(asset) {
        this.assets.push(asset);
    }
}
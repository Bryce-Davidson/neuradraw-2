import AssetController from './AssetController';

export default class AnimationController extends AssetController {
    /**
     * 
     * @param {String} name - The name of the asset
     * @param {Object} default_config - The default drawing configuration for the asset
     * @param {Number} frameIn - The frame to begin drawing on relative to a scene
     * @param {Number} frameOut - The frame to stop drawing on relative to a scene
     */
    constructor(name, frameIn, frameOut, default_config) {
        if(!name)
            throw new Error('Please provide a name for the asset.')
        if(frameIn==undefined || frameOut==undefined)
            throw new Error(`Please provide a frameIn AND a frameOut for \"${name}\"`);
        
        super(name, default_config);
        
        this.frameIn = frameIn;
        this.frameOut = frameOut;
    }

    timeline(frame) {
        if(frame >= this.frameIn && frame <= this.frameOut)
        // this is really where the bulk of animation contrller will be written and maintained blah blah
            this.draw();
    };


    // We need to save some smart controls to the animation contrller in order to
    // allow the tweening to happen

    grow(config_key, type, frameIn, frameOut) {
        console.log(arguments)
        // do something to append to the timeline
    }
}
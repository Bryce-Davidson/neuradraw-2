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
        if(frameIn==undefined || frameOut==undefined)
            throw new Error(`Please provide a frameIn and a frameOut for \"${name}\"`);
        super(name, default_config);
        this.frameIn = frameIn;
        this.frameOut = frameOut;
    }

    timeline(frame) {
        console.log(frame);
    };

    grow(config_key, type, frameIn, frameOut) {
        
    }
}
import AssetController from './AssetController';

export default class AnimationController extends AssetController {
    /**
     * 
     * @param {Number} frameIn - The frame to begin drawing on relative to a scene
     * @param {Number} frameOut - The frame to stop drawing on relative to a scene
     */
    constructor(name, frameIn, frameOut) {
        if(frameIn==undefined || frameOut==undefined)
            throw new Error(`Please provide a frameIn and a frameOut for \"${name}\"`);
        super(name);
        this.frameIn = frameIn;
        this.frameOut = frameOut;
        this.state.timeline = []
    }

    timeline(frame) {
        console.log(frame);
    };

    grow(config_key, type, frameIn, frameOut) {
        // update the drawing config according to the type
    }

}
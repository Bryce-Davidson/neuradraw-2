import AssetController from './AssetController';
import Timeline from './Timeline';

/**
 * Guiding principles
 * 
 * AnimationController should controll everything that has to do
 * with the existance of the asset.
 * 
 * It will control and manipulate it's own timeline to fit this purpose
 */
export default class AnimationController extends AssetController {
    /**
     * 
     * @param {String} name - The name of the asset
     * @param {Object} default_config - The default drawing configuration for the asset
     * @param {Number} frame_in - The frame to begin drawing on relative to a scene
     * @param {Number} frame_out - The frame to stop drawing on relative to a scene
     */
    constructor(name, frame_in, frame_out, default_config) {
        if(!name)
            throw new Error('Please provide a name for the asset.')
        if(frame_in==undefined || frame_out==undefined)
            throw new Error(`Please provide a frame_in AND a frame_out for \"${name}\"`);
        super(name, default_config);
        this.frame_in = frame_in;
        this.frame_out= frame_out;

        this.timeline = new Timeline(frame_out-frame_in, default_config);
    }

    render_frame(frame) {        
        if(frame >= this.frame_in && frame <= this.frame_out) {
           return this.draw(this.timeline.get_frame(frame));
        }
    }
}
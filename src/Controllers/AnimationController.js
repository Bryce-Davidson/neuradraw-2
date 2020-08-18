import AssetController from './AssetController';
import Timeline from './Timeline';

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
        this.timeline = new Timeline(frame_in, frame_out);
    }

    render_frame(frame) {
        // we only use this top line here becasue
        // I think we need to include frame logic here
        var draw_config = this.timeline.get_frame(frame) || this.config;
        this.draw(draw_config);
    }

    to(config_key, frame_in, frame_out, start) {
        var new_config = {}
        new_config[config_key] = start;
        for(var i=0; i < Array.from(Array(frame_out-frame_in).keys()).length; i++) {
            new_config[config_key] += i;
            this.timeline.timeline.push({
                ...this.config,
                ... new_config
            })
        }
    }
}
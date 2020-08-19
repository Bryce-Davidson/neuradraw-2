import AssetController from './AssetController';
import Timeline from './Timeline';
import { interpolateObject, interpolateNumber } from 'd3-interpolate';

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
            var cur_frame = this.timeline.get_frame(frame-this.frame_in)
            return this.draw(cur_frame);
        }
    }

    /**
     * 
     * @param {String} config_key - The config key to tween.
     * @param {Object} param1 - Config object
     * @param {Function} param1.easing - A D3.js easing function to be used
     */
    value_from_to(config_key, {easing, from, to, start_frame=this.frame_in, end_frame=this.frame_out}) {

        if(start_frame < this.frame_in || end_frame > this.frame_out)
            throw new Error(`start_frame or end_frame is being clipped by ${this.name}'s frame_in or frame_out value.`)

        var tween = interpolateNumber(from, to)
        for(var i=start_frame; i<end_frame; i++) {
            this.timeline.update_frame(i, {
                [config_key]: tween(easing(i/end_frame))
            })
        }

        this.timeline.update_rest_from(end_frame, {
            [config_key]: to
        })
    }

    config_from_to(config_key, {easing, from, to, start_frame=this.frame_in, end_frame=this.frame_out}) {

        if(start_frame < this.frame_in || end_frame > this.frame_out)
            console.warn(`
                    start_frame or end_frame is being clipped by  
                    ${this.name}'s frame_in or frame_out value.
                    on function call ${this.name}.to(..., {
                        ...,
                        start_frame:${start_frame},
                        end_frame:${end_frame},
                        ...
                    })
            `)

        var tween = interpolateNumber(from, to)
        for(var i=start_frame; i<end_frame; i++) {
            this.timeline.update_frame(i, {
                [config_key]: tween(easing(i/end_frame))
            })
        }
    }
}
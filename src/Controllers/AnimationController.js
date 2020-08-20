import AssetController from './AssetController';
import Timeline from './Timeline';
import { interpolate } from 'd3-interpolate';

export default class AnimationController extends AssetController {
    /**
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

        this.timeline = new Timeline(frame_out-frame_in);
        this.timeline.init(default_config)
    }

    frame(frame) {
        return this.timeline.get_frame(frame);
    }

    render_frame(frame) {     
        if(frame >= this.frame_in && frame <= this.frame_out) {
            var cur_frame = this.timeline.get_frame(frame-this.frame_in)
            return this.draw(cur_frame);
        }
    }

    value_from_to({config_key,easing, from, to, start_frame=this.frame_in, end_frame=this.frame_out}) {
        
        if(start_frame < this.frame_in)
            throw new Error(`
                tween for ${this.name}.${config_key} is out of bounds.
                start_frame needs to be <= ${this.start_frame}
                `)
        if(end_frame > this.frame_out)
            throw new Error(`\n
                tween for ${this.name}.${config_key} is out of bounds.
                end_frame needs to be <= ${this.frame_out}
                `)
        
        var tween = interpolate(from, to)
        for(var i=start_frame; i<end_frame; i++) {
            var ease_value = easing((i-start_frame)/(end_frame-start_frame));
            var tween_value = tween(ease_value);
            this.timeline.update_frame(i, {[config_key]: tween_value})
        }
        this.timeline.update_after(end_frame, {[config_key]: to})
    }

    config_from_to(from, to, {easing, start_frame=this.frame_in, end_frame=this.frame_out}) {
        
        if(start_frame < this.frame_in)
            throw new Error(`
                tween for ${this.name}.config is out of bounds.
                start_frame needs to be <= ${this.start_frame}
                `)
        if(end_frame > this.frame_out)
            throw new Error(`\n
                tween for ${this.name}.config is out of bounds.
                end_frame needs to be <= ${this.frame_out}
                `)
        
        var tween = interpolate(from, to)
        for(var i=start_frame; i<end_frame; i++) {
            var ease_value = easing((i-start_frame)/(end_frame-start_frame));
            var tween_value = tween(ease_value);
            this.timeline.update_frame(i, tween_value)
        }
        this.timeline.update_after(end_frame, to)
    }
}
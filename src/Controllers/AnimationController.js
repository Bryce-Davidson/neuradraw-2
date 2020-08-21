import AssetController from './AssetController';
import Timeline from './Timeline';
import { interpolate } from 'd3-interpolate';
import { easeLinear } from 'd3-ease';
import TweenError from '../Utility/Errors/TweenError';

export default class AnimationController extends AssetController {
    /**
     * @param {String} name - The name of the asset
     * @param {Number} frame_in - The frame to begin drawing on a scene | frame_in >= 1
     * @param {Number} frame_out - The frame to stop drawing on a scene
     * @param {Object} default_config - The default drawing configuration for the asset
     * @returns AnimationController
     */
    constructor(name, frame_in, frame_out, default_config) {
        super(name, default_config);

        if(frame_in<1)
            throw new Error(`Asset ${this.name}'s frame_in is < 1. ${this.name}'s frame_in needs to be >= 1`)

        if(frame_in==undefined || frame_out==undefined)
            throw new Error(`Please provide a frame_in AND a frame_out for \"${name}\"`);
        this.timeline = new Timeline(frame_in, frame_out);
        this.timeline.init(this.default)
    }

    /**
     * Gets a frame from the assets timeline.
     * 
     * @param {Number} frame - The frame in the assets timeline.
     * @returns A frame from the assets timeline
     */
    get_frame(frame) {
        if(frame<1)
            throw new Error(`frame must be > 0 currently ${frame}`)
        return this.timeline.get_frame(frame);
    }

    /**
     * Executes the drawing function of the asset with a frame from the timeline.
     * 
     * @param {Number} frame - The frame to render.
     * @returns undefined
     */
    render_frame(frame) {
        if(frame >= this.timeline.frame_in && frame <= this.timeline.frame_out) {
            var cur_frame = this.timeline.get_frame(frame)
            this.draw(cur_frame);
        }
    }

    /**
     * Tweens a config_key for the asset from start_frame to end_frame.
     * 
     * @param {Object} param0 - The config object.
     * @param {String} param0.config_key - The config key of the asset to be tweened
     * @param {String} param0.from - The start value of the tween
     * @param {String} param0.to - The end value of the tween
     * @param {String} [param0.easing=d3.easing.easeLinear] - A D3.js easing function.
     * @param {String} [param0.start_frame=this.frame_in] - The frame to start tweening the config_key
     * @param {String} [param0.end_frame=this.frame_out] - The frame to end tweening the config_key
     * @returns undefined
     */
    value_from_to({config_key, easing=easeLinear, from, to, start_frame=this.frame_in, end_frame=this.frame_out}) {
        
        if(start_frame < this.timeline.frame_in)
            throw new Error(`
                tween for ${this.name}.${config_key} is out of bounds.
                start_frame needs to be >= ${this.timeline.frame_in}.
                currently: ${start_frame}
                `)
        if(end_frame > this.timeline.frame_out)
            throw new Error(`\n
                tween for ${this.name}.${config_key} is out of bounds.
                end_frame needs to be <= ${this.timeline.frame_out}
                currently: ${end_frame}
                `)
        
        var tween = interpolate(from, to)
        for(var i=start_frame; i<end_frame; i++) {
            var ease_value = easing((i-start_frame)/(end_frame-start_frame));
            var tween_value = tween(ease_value);
            this.timeline.update_frame(i, {[config_key]: tween_value})
        }
        this.timeline.update_after(end_frame, {[config_key]: to})
    }

    /**
     * Tweens a config object for the asset from start_frame to end_frame.
     * 
     * @param {Object} param0 - The config object.
     * @param {String} param0.to - The end config of the tween
     * @param {String} param0.from - The start config of the tween
     * @param {String} [param0.easing=d3.easing.easeLinear] - A D3.js easing function.
     * @param {String} [param0.start_frame=this.frame_in] - The frame to start tweening the config_key
     * @param {String} [param0.end_frame=this.frame_out] - The frame to end tweening the config_key
     * @returns undefined
     */
    config_from_to(from, to, {easing, start_frame=this.frame_in, end_frame=this.frame_out}) {
        
        if(start_frame < this.frame_in)
            throw new TweenError(`
                tween for ${this.name}.config is out of bounds.
                start_frame needs to be >= ${this.timeline.frame_in}.
                currently: ${start_frame}
                `)
        if(end_frame > this.frame_out)
            throw new TweenError(`\n
                tween for ${this.name}.config is out of bounds.
                end_frame needs to be <= ${this.timeline.frame_out}.
                currently: ${end_frame}
                `)
        
        var tween = interpolate(from, to)
        for(var i=start_frame; i<end_frame; i++) {
            var ease_value = easing((i-start_frame)/(end_frame-start_frame));
            var tween_value = tween(ease_value);
            this.timeline.update_frame(i, tween_value)
        }
        this.timeline.update_after(end_frame, to)
    }


    link(other_asset, {self_key, other_key, start_frame, end_frame, controller}) {

        // if(!other_asset instanceof AnimationController)
        //     throw new TypeError();

        TODO:
        // [] other asset doesn't exist
        // [] other key doesn't exist
        // [] self_key doesn't exist
        // [] controller isn't valid function

        if(start_frame < other_asset.frame_in)
            throw new TweenError(`
                LINK for ${this.name}.${self_key} & ${other_asset.name}.${other_key}
                is out of bounds.
                start_frame needs to be >= ${other_asset.frame_in}.
                currently: ${start_frame}
            `)
        
        if(end_frame > this.timeline.frame_out)
            throw new TweenError(`
                LINK for ${this.name}.${self_key} & ${other_asset.name}.${other_key}
                is out of bounds.
                end_frame needs to be <= ${other_asset.frame_out}.
                currently: ${end_frame}
            `)
        
        var other_value;
        for(var i=start_frame; i<end_frame; i++) {
            other_value = other_asset.timeline.get_frame(i)[other_key];
            if(controller)
                other_value = controller(other_value)
            this.timeline.update_frame(i, {[self_key]: other_value})
        }
        this.timeline.update_after(end_frame, {[self_key]: other_value})   
    }


    config_map(other_asset, map_object, {start_frame, end_frame}) {    
        var map_keys = Object.keys(map_object);
        for(var i=0; i < map_keys.length; i++) {

            var other_key = map_object[map_keys[i]].other_key || map_object[map_keys[i]];
            var controller = map_object[map_keys[i]].controller;

            // Link each key with the controller
            this.link(other_asset, {
                self_key: map_keys[i],
                other_key,
                start_frame,
                end_frame,
                controller
            })
        }
    }

    follow(path) {
        if(this.config.x==undefined || this.config.y==undefined)
            throw new TweenError(`Asset ${this.name} does not have xy coordinates`)
        
    }

    get frame_in() {
        return this.timeline.frame_in;
    }

    get frame_out() {
        return this.timeline.frame_out;
    }
}
// Timeline is just an array of drawing configs with some fancy functions
// that update the timeline etc..
// replace etc


// Timeline needs to handle the updating and insertion of new frames will preserving unchanged
// values within those frames

// each frame is a drawing config to be returned on key of frame
// aka the index

export default class Timeline {
    constructor(frame_in, frame_out, default_config) {
        this.frame_in = frame_in;
        this.timeline = new Array(frame_out-frame_in);
        this.timeline.fill(default_config, 0)
        this.cur_frame = 0;
    }

    get_frame(frame, frame_in) {
        this.cur_frame++;
        var idx = frame - this.frame_in
        var thing = this.timeline[idx];
        return thing;
    }

    add_frame(index, source) {
        this.timeline[index] = source;
    }

    update_frame(target_index, source) {
        Object.assign(this.timeline[target_index], source)
    }
}
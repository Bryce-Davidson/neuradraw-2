// Timeline is just an array of drawing configs with some fancy functions
// that update the timeline etc..
// replace etc


// Timeline needs to handle the updating and insertion of new frames will preserving unchanged
// values within those frames

// each frame is a drawing config to be returned on key of frame
// aka the index

export default class Timeline {
    constructor(length, default_config) {
        this.timeline = new Array(length);
        this.timeline.fill(default_config, 0)
        this.cur_frame = 0;
    }

    get_frame(frame) {
        this.cur_frame++;
        return this.timeline[frame - this.frame_in];
    }

    add_frame(index, source) {
        this.timeline[index] = source;
    }

    update_frame(target_index, source) {
        Object.assign(this.timeline[target_index], source)
    }
}
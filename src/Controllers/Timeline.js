// Timeline is just an array of drawing configs with some fancy functions
// that update the timeline etc..
// replace etc


// Timeline needs to handle the updating and insertion of new frames will preserving unchanged
// values within those frames

// each frame is a drawing config to be returned on key of frame
// aka the index

export default class Timeline {
    constructor(frame_in, frame_out) {
        this.frame_in = frame_in;
        this.frame_out = frame_out;
        this.timeline = []
        this.cur_frame = 0;
    }

    get_frame(frame) {
        if(frame >= this.frame_in && frame <= this.frame_out) {
            return this.timeline[frame - this.frame_in];
        }
    }

    add_frame(index, config) {
        this.timeline[index] = config;
    }
}
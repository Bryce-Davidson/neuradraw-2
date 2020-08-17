// Time line is just an array of drawing configs with some fancy functions
// that update the timeline etc..

export default class Timeline {
    constructor(frame_in, frame_out) {
        this.frame_in = frame_in;
        this.frame_out = frame_out;
        this.timeline = []
    }

    get_config(frame) {
        if(frame >= this.frame_in && frame <= this.frame_out) {
            return;
        }
    }
}
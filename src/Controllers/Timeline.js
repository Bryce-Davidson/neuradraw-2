// Timeline is just an array of drawing configs with some fancy functions
// that update the timeline etc..
// replace etc


// Timeline needs to handle the updating and insertion of new frames will preserving unchanged
// values within those frames

// each frame is a drawing config to be returned on key of frame
// aka the index

export default class Timeline {
    constructor(total_frames, default_config) {
        this.timeline = [];
        for(var i=0; i < total_frames; i++) {
            let obj = {...default_config};
            this.timeline.push(obj)
        }
        this.cur_frame = 0;
    }

    get_frame(frame) {
        this.cur_frame++;
        return this.timeline[frame];;
    }

    add_frame(index, source) {
        this.timeline[index] = source;
    }

    update_frame(target_index, source) {
        Object.assign(this.timeline[target_index], source)
        console.log(this.timeline[target_index]);
    }
}
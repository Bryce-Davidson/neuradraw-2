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
        return this.timeline[frame];
    }

    add_frame(index, source) {
        this.timeline[index] = source;
    }

    update_frame(target_index, source) {
        Object.assign(this.timeline[target_index], source)
    }

    update_rest_from(index, source) {
        for(var i=index; i < this.timeline.length; i++) {
            Object.assign(this.timeline[i], source)
        }
    }
}
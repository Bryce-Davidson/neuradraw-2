export default class Timeline {
    /** 
     * Initializes a new class of Timeline.
     * 
     * @param {Number} total_frames - The total number of frames in the timeline.
     */
    constructor(total_frames) {
        this.timeline = new Array(total_frames);
        this.cur_frame = 0;
    }

    /**
     * Sets every index in the timeline to an object provided.
     * 
     * @param {Object} init_object - The object to initialize every spot in the timeline too.
     */
    init(init_object) {
        for(var i=0; i < this.timeline.length; i++) {
            let obj = {...init_object};
            this.timeline[i] = obj
        }
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

    update_after(index, source) {
        for(var i=index; i < this.timeline.length; i++) {
            Object.assign(this.timeline[i], source)
        }
    }
}
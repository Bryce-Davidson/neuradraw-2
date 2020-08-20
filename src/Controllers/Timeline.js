export default class Timeline {
    /** 
     * 
     * @param {Number} frame_in - The start frame of the timeline.
     * @param {Number} frame_out - The end frame of the timeline.
     * @returns Timeline
     */
    constructor(frame_in, frame_out) {
        this.timeline = new Array(frame_out-frame_in);
        this.frame_in = frame_in;
        this.frame_out = frame_out;
    }

    /**
     * Sets every index in the timeline to an object provided.
     * 
     * @param {Object} init_object - The object to initialize every spot in the timeline too.
     * @returns undefined
     */
    init(init_object) {
        for(var i=0; i < this.timeline.length; i++) {
            let obj = {...init_object};
            this.timeline[i] = obj
        }
    }

    /**
     * Returns a frame from the timeline given an index.
     * 
     * @param {Number} index - The index of the frame to get within the timeline
     * @returns Object
     */
    get_frame(index) {
        return this.timeline[index-this.frame_in];
    }

    /**
     * Replaces or adds a frame at an index.
     * 
     * @param {Number} index - The index for the frame to be replaced or added in timeline
     * @param {Object} source - The frame to be added to the timeline
     * @returns undefined
     */
    add_frame(index, source) {
        this.timeline[index] = source;
    }

    /**
     * Updates a frame at a specified index within the timeline.
     * 
     * @param {Number} index - The index of the frame to be updated in the timeline
     * @param {Object} source - The update to the frame within the timeline
     * @returns undefined
     */
    update_frame(index, source) {
        Object.assign(this.timeline[index], source)
    }

    /**
     * Updates every frame in the timeline after an index to the end.
     * 
     * @param {Number} index - The index to start 
     * @param {Object} source - The update
     * @returns undefined
     */
    update_after(index, source) {
        for(var i=index; i < this.timeline.length; i++) {
            Object.assign(this.timeline[i], source)
        }
    }
}
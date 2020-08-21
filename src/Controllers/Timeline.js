export default class Timeline {
    /** 
     * 
     * @param {Number} frame_in - The start frame of the timeline.
     * @param {Number} frame_out - The end frame of the timeline.
     * @returns Timeline
     */
    constructor(frame_in, frame_out) {
        // We need the plus one because 3-2 = 1 but it is in for 2 frames
        this.timeline = new Array(frame_out-frame_in+1);
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
     * @param {Number} frame - The current frame of the Scene.
     * @returns Object
     */
    get_frame(frame) {
        let index = frame-this.frame_in;
        return this.timeline[index];
    }

    /**
     * Replaces or adds a frame at an index.
     * 
     * @param {Number} frame - The frame to be replaced or added in the timeline
     * @param {Object} source - The frame to be added to the timeline
     * @returns undefined
     */
    add_frame(frame, source) {
        this.timeline[frame-1] = source;
    }

    /**
     * Updates a frame at a specified index within the timeline.
     * 
     * @param {Number} frame - The frame to be updated in the timeline
     * @param {Object} source - The update to the frame within the timeline
     * @returns undefined
     */
    update_frame(frame, source) {
        Object.assign(this.timeline[frame-1], source)
    }

    /**
     * Updates every frame in the timeline after an index to the end.
     * 
     * @param {Number} frame - The frame to start 
     * @param {Object} source - The update
     * @returns undefined
     */
    update_after(frame, source) {
        for(var i=frame-1; i < this.timeline.length; i++) {
            Object.assign(this.timeline[i], source)
        }
    }
}
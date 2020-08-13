export default class AssetController {
    /**
     * 
     * @param {Number} frameIn - The frame to begin drawing on relative to a scene
     * @param {Number} frameOut - The frame to stop drawing on relative to a scene
     */
    constructor(frameIn, frameOut) {
        this.drawing_config;
        this.state = {};
        this.frameIn = frameIn;
        this.frameOut = frameOut;
        this.state.num_draws = 0;
    }


    timeline() {}

    /**
     * 
     * @param {Object} new_config - The config to update this.drawing_config to
     */
    update_drawing_config(new_config) {
        this.drawing_config = {
            ...this.drawing_config,
            ...new_config
        }
    }

    // How am i supposed to load in the effects so that
    // When i give this thing a frame the proper effects happen
    // expand(config_key, frameIn, duration)

}
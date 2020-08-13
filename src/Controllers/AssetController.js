export default class AssetController {
    constructor(name, default_config) {
        this.name = name;
        this.drawing_config = default_config;
        this.state = {};
        this.state.num_draws = 0;
    }
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
}
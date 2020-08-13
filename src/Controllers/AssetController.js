
export default class AssetController {
    constructor(name, default_config) {
        // enforce default config with typescript
        this.name = name;
        this.config = default_config;
        this.state = {};
        this.state.num_draws = 0;
    }
    
    /**
     * 
     * @param {Object} new_config - The config to update this.config to
     */
    update_config(new_config) {
        this.config = {
            ...this.config,
            ...new_config
        }
    }

    has_changed(new_config) {
        var is_equal = true;
        return !is_equal;
    }

    get_compute_keys() {

    }
}
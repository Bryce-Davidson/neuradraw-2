
export default class AssetController {
    constructor(name, default_config) {
        // enforce default config with typescript
        this.name = name;
        this.config = default_config;
        this.state = {};
        this.state.num_draws = 0;
    }

    draw(new_config) {
        if(this.has_changed(new_config)) {
            // Update the config with the new_config
            this.update_config(new_config);
            // If there is a compute function available in the instance
            // call the compute function
            if(typeof this.compute === "function")
                this.compute(this.get_compute_keys());
        }
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

    save(state_name, state) {
        this.state[state_name] = state;
    }

    // add in the lodash module
    has_changed(new_config) {
        return true;
    }

    get_compute_keys() {
        return ["list", "of", "keys"]
    }
}
import isEqual from 'lodash.isequal';
export default class AssetController {
    /**
     * 
     * @param {String} name - The name of the asset
     * @param {Object} default_config - The default drawing config
     * @returns AssetController
     */
    constructor(name, default_config) {
        if(!name)
            throw new Error('Please provide a name for the asset.')
        this.name = name;
        this.config = {...default_config};
        this.default = default_config;
        this.state = {};
        this.state.num_draws = 0;
        this.ctx;
    }

    /**
     * Sets the drawing context for the asset.
     * 
     * @param {CanvasRenderingContext2D} ctx - The CanvasRenderingContext2D from a canvas element
     * @returns undefined
     */
    set_context(ctx) {
        this.ctx = ctx;
    }

    update(new_config) {
        // if(typeof this.compute === "function" && this.state.num_draws==0)
            // this.compute(Object.keys(this.config));

        if(new_config) {
            if(!isEqual(this.config, new_config)) {
                var old_config = {...this.config};
                this.update_config(new_config);
                if(typeof this.compute === "function")
                    this.compute(this.get_compute_keys(new_config, old_config));
            }
        }
        this.state.num_draws++;
        return;
    }

    /**
     * 
     * @param {Object} new_state - The update to be made to the assets state object
     */
    save(new_state) {
        // can hook in logic here to help with lifcycle if needed
        Object.assign(this.state, new_state);
    }
    
    /**
     * @param {Object} new_config - The config to update this.config to
     */
    update_config(new_config) {
        Object.assign(this.config, new_config);
    }

    /**
     * Does a deep comparison of this.config and new_config and returns
     * the keys that are different
     * 
     * @param {Object} new_config - The new configuration object
     * @returns {Array} 
     */
    get_compute_keys(new_config, old_config) {
        var compute_keys = [];
        const keys = Object.keys(new_config);
        for(var i=0; i < keys.length; i++)
            if(!isEqual(new_config[keys[i]], old_config[keys[i]]))
                compute_keys.push(keys[i]);
        return compute_keys;
    }
}
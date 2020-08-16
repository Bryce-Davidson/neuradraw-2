import isEqual from 'lodash.isequal';
export default class AssetController {
    constructor(name, default_config) {
        // enforce default config with typescript somehow
        this.name = name;
        this.config = default_config;
        this.default = default_config;
        this.state = {};
        this.state.num_draws = 0;
    }

    update(new_config) {
        if(this.state.num_draws==0 || this.has_changed(new_config)) {
            if(new_config)
                this.update_config(new_config);
            if(typeof this.compute === "function") {
                if(this.state.num_draws==0)
                    this.compute(Object.keys(this.default));
                else
                    this.compute(this.get_compute_keys());
            }
        }
        this.state.num_draws++;
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

    // Need to configure save function to embrace new syntax for saving "thing.another.another_thing..."
    save(state_name, state) {
        this.state[state_name] = state;
    }

    has_changed(new_config) {
        var is_equal = isEqual(this.drawing_config, new_config);
        return !is_equal;
    }

    get_compute_keys(new_config) {
        var compute_keys = [];
        const keys = Object.keys(new_config);
        for(var i=0; i < keys.length; i++)
            if(!isEqual(new_config[keys[i]], this.drawing_config[keys[i]]))
                compute_keys.push(keys[i]);
        return compute_keys;
    }
}
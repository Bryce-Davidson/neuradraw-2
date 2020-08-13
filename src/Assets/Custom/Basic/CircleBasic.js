import circle from '../../Primitives/Circle';
import stroke from '../../../Controllers/Context/Cosmetic/Stroke';
import fill from '../../../Controllers/Context/Cosmetic/Fill';
import {push, pop} from '../../../Controllers/Context/State';
import AssetController from '../../../Controllers/AssetController';

// I want to implement as little as possible here... and as much as possible in the AssetController

export default class CircleBasic extends AssetController {
    constructor(name) {
        super(name, {
            x:100,
            y:100,
            radius: 45,
            fill: 'red',
            stroke: 'black'
        })
    }

    // NEEDS
    compute(compute_keys) {
        // computes the necessary information for drawing
        // should a key come through, compute the necessary information
    }

    // NEEDS
    draw(new_config) {
        // NEEDS THIS CODE
        if(new_config)
            this.update_config(new_config);
        if(this.has_changed(new_config))
            this.compute(this.get_compute_keys(new_config));
        
        // CALL DRAWING FUNCTIONS HERE  
        this._draw_circle();
    }

    _draw_circle() {
        push();
        stroke(this.config.stroke);
        fill(this.config.fill);
        circle(this.config.x, this.config.y, this.config.radius);
        pop();
    }
}

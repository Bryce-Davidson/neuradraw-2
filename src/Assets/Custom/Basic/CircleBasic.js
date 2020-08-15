import circle from '../../Primitives/Circle';
import stroke from '../../../Controllers/Context/Cosmetic/stroke';
import fill from '../../../Controllers/Context/Cosmetic/fill';
import {push, pop} from '../../../Controllers/Context/State';
import AssetController from '../../../Controllers/AssetController';

// I want to implement as little as possible here... and as much as possible in the AssetController

export default class CircleBasic extends AssetController {
    /**
     * 
     * @param {String} name - The name of the instance
     * @param {Object} default_config - The default drawing config of the instance
     * @param {Number} default_config.x - The x value of the circles center
     * @param {Number} default_config.y - The y value of the circles center
     * @param {Number} default_config.radius - The radius value of the circle
     * @param {String} default_config.stroke - The stroke value of the circle
     * @param {String} default_config.fill - The fill value of the circle
     */
    constructor(name, default_config) {
        super(name, default_config)
    }

    // computes the necessary information for drawing
    // should a key come through, compute the necessary information
    // console.log(compute_keys)

    // OPTIONAL - Doesn't need to do anything
    // compute(stuff){
    //     console.log(stuff)
    // };

    // NEEDS
    draw(new_config) {
        // NEEDS to call super.draw(new_config)
        super.update(new_config);
        this._draw_circle();
    }

    // Any drawing commands needs to reference the config and the state object
    _draw_circle() {
        push();
        stroke(this.config.stroke);
        fill(this.config.fill);
        circle(this.config.x, this.config.y, this.config.radius);
        pop();
    }
}

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
        super.draw(new_config);
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

import circle from '../../Primitives/Circle';
import stroke from '../../../Controllers/Context/Cosmetic/Stroke';
import fill from '../../../Controllers/Context/Cosmetic/Fill';
import {push, pop} from '../../../Controllers/Context/State';
import AssetController from '../../../Controllers/AssetController';

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

    compile(compile_keys) {

    }

    draw() {
        push();
        stroke(this.drawing_config.stroke);
        fill(this.drawing_config.fill);
        circle(this.drawing_config.x, this.drawing_config.y, this.drawing_config.radius);
        pop();
    }
}

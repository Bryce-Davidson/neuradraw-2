import circle from '../../Primitives/Canvas/circle';
import AnimationController from '../../../Controllers/AnimationController';

export default class CircelControlled extends AnimationController {
    constructor(name, frameIn, frameOut, default_config={
        x:100,
        y:100,
        radius: 45
    }) 
    {
        super(name, frameIn, frameOut, default_config)
    }

    draw(new_config) {
        super.update(new_config);
        circle(this.config.x, this.config.y, this.config.radius)
    }
}
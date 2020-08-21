import circle from '../../Primitives/Canvas/circle';
import AnimationController from '../../../Controllers/AnimationController';

export default class CircelControlled extends AnimationController {
    /**
     * 
     * @param {String} name - The name of the circle
     * @param {Number} frameIn - Frame in for the animation relative to a scene
     * @param {Number} frameOut - Frame out for the animation relative to a scene
     * @param {Object} default_config - The default config of the circle
     * @param {Object} default_config.x - The x value of the center of the circle
     * @param {Object} default_config.y - The y value of the center of the circle
     * @param {Object} default_config.radius - The radius value fo the circle
     */
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
        circle(this.ctx, this.config.x, this.config.y, this.config.radius)
    }
}
import AnimationController from '../../../Controllers/AnimationController';

export default class CircelControlled extends AnimationController {
    constructor(name, frameIn, frameOut) {
        super(name, frameIn, frameOut, {
            x: 100,
            y: 100,
            radius: 45
        })
    }

    compute() {

    }

    draw(new_config) {

    }
}
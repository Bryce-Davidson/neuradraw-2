import AnimationController from '../../../Controllers/AnimationController';

// You wouldn't extend asset controler unless you wanted access to the functionality
export default class CircleAsset extends AnimationController {
    constructor(name, frameIn, frameOut) {
        super(name, frameIn, frameOut);
        this.update_drawing_config({
            x: 100,
            y: 300,
            radius: 45
        })
    }

    timeline(frame) {
        console.log(frame);
    }

    compile(compile_keys) {

    }

    draw() {
        
    }
}
import AnimationController from '../../../Controllers/AnimationController';

export default class PointMap extends AnimationController {
    constructor(name, frame_in, frame_out, default_config) {

    }

    compute(){};
    
    draw(new_config) {
        super.update()
    };
    
    __compute_interpolation_vertices(target) {

    }

    _draw_path() {

    }

    // Don't know enough about the interpolate or
    //  the tween function in order to add it into one or the other
}
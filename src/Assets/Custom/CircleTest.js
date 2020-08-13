import AssetController from '../../Controllers/AssetController';

export default class CircleAsset extends AssetController {
    constructor(name, frameIn, frameOut) {
        super(frameIn, frameOut);
        this.name = name;
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
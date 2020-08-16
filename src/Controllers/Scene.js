import { ctx, canvas } from './canvas';
import AnimationController from './AnimationController';
export default class Scene {
    /**
     * 
     * @param {String} name - the name of the scene
     * @param {Number} fps - The frames per second for the scene 
     * @param {Number} duration - The duration of the scene in miliseconds (1000 miliseconds = 1 second)
     * @param {[AnimationController]} assets - The duration of the scene in miliseconds (1000 miliseconds = 1 second)
     */
    constructor(name, fps, duration, assets) {


        this.name = name;
        this.fps = fps;
        this.duration = duration;
        
        this.num_frames = Math.round(fps * duration);
        this.cur_frame = 0;
        this.assets = assets || [];
    }
    
    play() {
        // This is where the canvas will be drawn to as well as the
        // asset timelines being updated
        window.setInterval(this.render, fps*1000)

    }

    render(frame) {
        for(var i in assets) {
            this.assets[i].timeline(frame);
        }
        this.cur_frame++;
    }


    /**
     * @param {AnimationController} asset - The drawing asset to be added to the scene
     */
    add_asset(asset) {
        if(asset.frameOut > this.frameOut) {
            console.warn(
                `
                    Asset: ${asset.name} is clipping the end of the scene \n 
                    Please change ${asset.name}.frameOut to be \n
                    less than or equal to ${this.name}.frameOut
                `)
        }
        this.assets.push(asset);
    }
}
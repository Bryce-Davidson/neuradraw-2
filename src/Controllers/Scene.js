import AnimationController from './AnimationController';

// The scene really should be drawing to a custom canvas element
// So that you can do split screen mode

// that just means all the primitive objects will havr to be passed a context as an argument

export default class Scene {
    /**
     * 
     * @param {Object} ctx - the name of the scene
     * @param {String} name - the name of the scene
     * @param {Number} fps - The frames per second for the scene
     * @param {Number} duration - The duration of the scene in miliseconds (1000 miliseconds = 1 second)
     * @param {[AnimationController]} assets - The duration of the scene in miliseconds (1000 miliseconds = 1 second)
     */
    constructor(ctx, name, fps, duration, assets) {
        this.ctx = ctx;
        this.name = name;
        this.fps = fps;
        this.duration = duration;
        this.num_frames = Math.round(fps * duration/1000);
        
        this.cur_frame = 0;
        this.assets = assets || [];
        this.interval_id;
    }
    
    play() {
        this.interval_id = window.setInterval(()=> this.__render(this.cur_frame), 1000/this.fps)
        this.ctx.font = "30px Arial";
    }

    stop() {
        window.clearInterval(this.interval_id);
    }

    __render(frame) {
        // console.log(this.cur_frame);
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.fillText(`${this.cur_frame}`, 10, 50);

        if(this.cur_frame == this.num_frames)
            this.stop();
        for(var i in this.assets) {
            this.assets[i].timeline(frame);
        }
        this.cur_frame++;
    }


    /**
     * @param {AnimationController} asset - The drawing asset to be added to the scene
     */
    add_asset(asset) {
        if(asset.frameOut > this.num_frames) {
            console.warn(
                `
                    Asset: ${asset.name} is being clipped by the end of scene: ${this.name} \n 
                    Please change ${asset.name}.frameOut to be \n
                    less than or equal to ${this.name}.num_frames
                `)
        }
        this.assets.push(asset);
    }
}
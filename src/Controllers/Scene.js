import AnimationController from './AnimationController';

// The scene really should be drawing to a custom canvas element
// So that you can do split screen mode

// that just means all the primitive objects will havr to be passed a context as an argument

export default class Scene {
    /**
     * 
     * @param {Object} ctx - The ctx for the scene to draw on
     * @param {String} name - The name of the scene
     * @param {Object} config - The config object for the scene
     * @param {Number} config.fps - The frames per second for the scene
     * @param {Number} config.duration - The duration of the scene in miliseconds (1000 miliseconds = 1 second)
     * @param {Boolean} config.show_frame_count - Whether or not to show the frame count of the scene
     * 
     */
    constructor(ctx, name, config={fps:60, duration:5000, show_frame_count:true}) {
        this.name = name;
        this.ctx = ctx;

        // This was the only way i could find to make js doc document the config options
        // as well as acheive defaults when only specifying one variable
        // might need to search on stack
        this.config = config;
        this.config.fps = config.fps || 60;
        this.config.show_frame_count = config.show_frame_count || false;
        
        this.num_frames = Math.round(this.config.fps * this.config.duration/1000);
        this.cur_frame = 0;
        this.assets = [];
        this.interval_id;
    }
    
    play() {
        this.interval_id = window.setInterval(()=> this.__render(this.cur_frame), 1000/this.config.fps)
        this.ctx.font = "30px Arial";
    }

    stop() {
        window.clearInterval(this.interval_id);
    }

    __render(frame) {
        this.__clear_scene();
        if(this.config.show_frame_count)
            this.ctx.fillText(`${this.cur_frame}`, 10, 50);
        
        if(this.cur_frame == this.num_frames)
            this.stop();
        for(var i in this.assets) {
            this.assets[i].timeline(frame);
        }
        this.cur_frame++;
    }

    __clear_scene() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
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
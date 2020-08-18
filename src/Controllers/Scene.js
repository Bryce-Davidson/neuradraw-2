import AnimationController from './AnimationController';

export default class Scene {
    /**
     * 
     * @param {Object} ctx - The ctx for the scene to draw on
     * @param {String} name - The name of the scene
     * @param {Object} config - The config object for the scene
     * @param {Number} config.fps - The frames per second for the scene
     * @param {Number} config.duration - The duration of the scene in miliseconds (1000 miliseconds = 1 second)
     * @param {Boolean} config.show_frame_count - Whether or not to show the frame count of the scene
     */
    constructor(ctx, name, config) {
        this.name = name;
        this.ctx = ctx;

        this.config = config;
        this.config.fps = config.fps || 60;

        if(this.config.fps > 60)
            throw new Error(`Scene: ${this.name}, config.fps cannot be greater than 60.`)

        this.config.show_frame_count = config.show_frame_count || false;
        
        this.num_frames = Math.round(this.config.fps * this.config.duration/1000);
        this.cur_frame = 0;
        this.interval_id;
        this.assets = [];
    }
    
    play() {
        if(this.assets.length==0)
            throw new Error(`There are no assets in Scene: ${this.name}`)
        if(this.config.show_frame_count)
            this.ctx.font = "30px Arial";
        this.interval_id = window.setInterval(()=> this.__render(this.cur_frame), 1000/this.config.fps)
    }

    stop() {
        window.clearInterval(this.interval_id);
    }

    __render(frame) {
        if(this.cur_frame == this.num_frames)
            this.stop();
        
        this.__clear_scene();
        for(var i in this.assets) {
            this.assets[i].render_frame(frame);
        }
        if(this.config.show_frame_count)
        this.ctx.fillText(`${this.cur_frame}`, this.ctx.canvas.width - 100, 50);
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
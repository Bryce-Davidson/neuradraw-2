import AnimationController from './AnimationController';

// I think i have to make it so that the time renders at 60fps always

export default class Scene {
    /**
     * Initializes a new class of Scene.
     * 
     * @param {Object} ctx - The ctx for the scene to draw on
     * @param {String} name - The name of the scene
     * @param {Object} config - The config object for the scene
     * @param {Number} config.fps - The frames per second for the scene
     * @param {Number} config.duration - The duration of the scene in miliseconds (1000 miliseconds = 1 second)
     * @param {Boolean} [config.show_frame_count] - Whether or not to show the frame count of the scene
     * @param {Boolean} [config.show_time] - Whether or not to show the time elapsed_time in the scene
     * @returns Scene
     */
    constructor(ctx, name, config) {
        this.name = name;
        this.ctx = ctx;
        
        this.config = config;
        this.config.fps = config.fps || 60;
        if(this.config.fps > 60)
            throw new Error(`Scene: ${this.name}, config.fps cannot be greater than 60.`)
        this.config.show_frame_count = config.show_frame_count || false;
        this.config.show_time = config.show_time || false;
        
        this.num_frames = Math.round(this.config.fps * this.config.duration/1000);
        this.assets = [];
        
        this.cur_frame = 0;
        this.elapsed_time = 0;
        this.interval_id;
        this.start_time;
    }
    
    /**
     * Plays the scene for the specified number of miliseconds in config.duration
     * 
     * @returns undefined
     */
    play() {
        if(this.assets.length==0)
            throw new Error(`There are no assets in Scene: ${this.name}`)
        
        this.__set_elapsed_time_and_font_if()
        
        this.__render(this.cur_frame)
        this.interval_id = window.setInterval(()=> this.__render(this.cur_frame), 1000/this.config.fps)
    }

    /**
     * Stops the scene
     * 
     * @returns undefined
     */
    stop() {
        window.clearInterval(this.interval_id);
    }

    /**
     * Draws all assets in this to this.ctx
     * 
     * @param {Number} frame - The frame of the scene to render to this.ctx
     * @returns undefined
     */
    __render(frame) {
        if(this.cur_frame == this.num_frames)
            this.stop();
        this.__clear_scene();

        for(var i in this.assets)
            this.assets[i].render_frame(frame);

        this.__show_frames_if();
        this.__show_time_if();
        
        this.cur_frame++;
    }

    /**
     * Clears all of the assets off of this.ctx
     * 
     * @returns undefined
     */
    __clear_scene() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    /**
     * Adds an AnimationController asset to the scene.
     * 
     * @param {AnimationController} asset - The drawing asset to be added to the scene
     * @returns undefined
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

    /**
     * Adds any number of assets to the Scene
     * 
     * @param {AnimationController} args 
     * @returns undefined
     */
    add_assets(args) {
        for(var i=0; i < arguments.length; i++) {
            this.add_asset(arguments[i])
        }
    }

    /**
     * Checks if this.config.show_frame_count is true and renders this.num_frames to this.ctx
     * 
     * @returns undefined
     */
    __show_frames_if() {
        if(this.config.show_frame_count)
            this.ctx.fillText(`frame: ${this.cur_frame}`, this.ctx.canvas.width - 200, 50);
    }

    /**
     * Checks if this.config.show_time is true and renders this.elapsed_time to this.ctx
     * 
     * @returns undefined
     */
    __show_time_if() {
        if(this.config.show_time) {
            let frame_time = new Date();
            this.elapsed_time = frame_time - this.start_time;
            this.ctx.fillText(`time: ${(this.elapsed_time/1000).toFixed(3)}`, this.ctx.canvas.width - 200, 100);
        }
    }

    /**
     * Sets the font for the frame count and time.
     * 
     * @returns undefined
     */
    __set_elapsed_time_and_font_if() {
        if(this.config.show_frame_count || this.config.show_time)
            this.ctx.font = "30px Arial";
        if(this.config.show_time)
            this.start_time = new Date();
    }
}
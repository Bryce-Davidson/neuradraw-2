import { ctx } from './Meta/canvas';
import Scene from './Controllers/Scene';


import Circle from './Assets/Custom/Controlled/CircleControlled';
import DNN from './Assets/Custom/Controlled/DNNControlled';
import { interpolateNumber, interpolateObject } from 'd3-interpolate';
import { easeBounceOut, easeCubicInOut, easeQuadInOut, easePolyInOut, easeBackInOut, easeElasticOut } from 'd3-ease';

var s1 = new Scene(ctx, "s1", {
    duration:1000, 
    show_frame_count: true,
    fps: 60,
    show_time: true
})

var d1 = new DNN("d1", 0, s1.num_frames, {
    x: 50,
    y: 0,
    diameter: 60,
    layer_spacing: 100,
    node_spacing: 20,
    weight_colors: 'black',
    weight_thicknesses: 0.1
})

d1.add_layer(3, "blue", "input", {})
d1.add_layer(3, "green", "h_1", {})
d1.add_layer(5, "purple", "h_2", {})
d1.add_layer(2, "red", "output", {})

var c1 = new Circle('c1', 0, s1.num_frames, {
    x: 100,
    y: 100,
    radius: 45
})

// c1.value_from_to({
//     config_key: "x",
//     easing: easeElasticOut.amplitude(1).period(0.9),
//     from: c1.config.x,
//     to: ctx.canvas.width-300,
//     start_frame: 0,
//     end_frame: Math.floor(s1.num_frames)
// })
c1.config_from_to({
    x: c1.config.x,
    y: 100
},{
    x: ctx.canvas.width-300,
    y: 400
}, {
    easing: easeElasticOut.amplitude(1).period(0.9),
    start_frame: 0,
    end_frame: Math.floor(s1.num_frames)
})

s1.add_asset(d1)
s1.add_asset(c1)
s1.play();

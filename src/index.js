import { ctx } from './Meta/canvas';
import Scene from './Controllers/Scene';


import Circle from './Assets/Custom/Controlled/CircleControlled';
import DNN from './Assets/Custom/Controlled/DNNControlled';
import { easeCubicInOut, easeLinear } from 'd3-ease';

var s1 = new Scene(ctx, "s1", {
    duration:1000, 
    show_frame_count: true,
    fps: 2,
    show_time: true
})

var d1 = new DNN("d1", 1, s1.num_frames, {
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

d1.value_from_to({
    config_key: "x",
    easing: easeCubicInOut,
    from: 0,
    to: 800,
    start_frame: 1,
    end_frame: 2
})

s1.add_asset(d1)
s1.play();

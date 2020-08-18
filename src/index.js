import { ctx } from './Meta/canvas';
import Scene from './Controllers/Scene';

// import DNN from './Assets/Custom/Basic/DNN-Basic';
import DNN from './Assets/Custom/Controlled/DNNControlled';

var s1 = new Scene(ctx, "s1", {
    duration:1000, 
    show_frame_count:true,
    fps: 14,
    show_time: true
})

// draw dnn for the entire thing
var d1 = new DNN("d1", 0, s1.num_frames, {
    x: 0,
    y: 0,
    diameter: 60,
    layer_spacing: 120,
    node_spacing: 60,
    weight_colors: 'black',
    weight_thicknesses: 1.3
})

d1.add_layer(2, "blue", "input", {})
d1.add_layer(3, "green", "h_1", {})
d1.add_layer(2, "red", "output", {})

console.log(d1);

s1.add_asset(d1)
// console.log(s1)
s1.play();
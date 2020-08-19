import { ctx } from './Meta/canvas';
import Scene from './Controllers/Scene';

// import DNN from './Assets/Custom/Basic/DNN-Basic';
import DNN from './Assets/Custom/Controlled/DNNControlled';
import { easeBounceOut, easeCircle, easeCubicInOut } from 'd3-ease';

var s1 = new Scene(ctx, "s1", {
    duration:2000, 
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
    weight_colors: 'blue',
    weight_thicknesses: 0.2
})

d1.add_layer(3, "blue", "input", {})
d1.add_layer(5, "green", "h_1", {})
d1.add_layer(5, "purple", "h_2", {})
d1.add_layer(2, "red", "output", {})

d1.value_from_to("node_spacing", {
    easing: easeCubicInOut,
    from: 0,
    to: 200,
    start_frame: 0,
    end_frame: s1.num_frames/2
})

d1.value_from_to("layer_spacing", {
    easing: easeCubicInOut,
    from: 0,
    to: 120,
    start_frame: 0,
    end_frame: s1.num_frames
})


s1.add_asset(d1)
// console.log(s1)
s1.play();
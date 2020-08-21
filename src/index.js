import { ctx } from './Meta/canvas';
import Scene from './Controllers/Scene';


import Circle from './Assets/Custom/Controlled/CircleControlled';
import DNN from './Assets/Custom/Controlled/DNNControlled';
import { easeCubicInOut, easeLinear } from 'd3-ease';
import CircelControlled from './Assets/Custom/Controlled/CircleControlled';
import AnimationController from './Controllers/AnimationController';


var s1 = new Scene(ctx, "s1", {
    duration:1000, 
    show_frame_count: true,
    fps: 60,
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
    end_frame: d1.frame_out
})

var c1 = new CircelControlled("c1", 1, s1.num_frames, {
    x: 100,
    y: 100,
    radius: 45
})

// c1.link(d1, {
//     self_key: "x",
//     other_key: "x",
//     start_frame: d1.frame_in,
//     end_frame: d1.frame_out
// })
// c1.link(d1, {
//     self_key: "y",
//     other_key: "x",
//     start_frame: d1.frame_in,
//     end_frame: d1.frame_out
// })

c1.config_map(d1, {
    x: "x", 
    radius: {
        other_key: "x",
        controller: other => other/3
    },
    y: "x"
}, {
    start_frame: d1.frame_in,
    end_frame: d1.frame_out
})

s1.add_assets(d1, c1)
console.log(s1)
s1.play();

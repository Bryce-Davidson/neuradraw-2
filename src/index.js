import { ctx } from './Meta/canvas';
import Scene from './Controllers/Scene';

import DNN from './Assets/Custom/Controlled/DNNControlled';
import { easeCubicInOut } from 'd3-ease';
import CircelControlled from './Assets/Custom/Controlled/CircleControlled';


var s1 = new Scene(ctx, "s1", {
    duration:2000, 
    show_frame_count: true,
    fps: 60,
    show_time: false
})

var d1 = new DNN("d1", 1, s1.num_frames, {
    x: 50,
    y: 0,
    diameter: 60,
    layer_spacing: 100,
    node_spacing: 20,
    weight_colors: 'red',
    weight_thicknesses: 1.1
})

d1.add_layer(3, "blue", "input", {})
d1.add_layer(3, "green", "h_1", {})
d1.add_layer(5, "purple", "h_2", {})
d1.add_layer(2, "red", "output", {})

console.log(d1.default)

d1.config_from_to(d1.default, {
    x: 800,
    y: 300,
    weight_colors: 'blue'
}, {
    easing: easeCubicInOut,
    start_frame: 1,
    end_frame: d1.frame_out  
})

var c1 = new CircelControlled("c1", 1, s1.num_frames, {
    x: 100,
    y: 100,
    radius: 45
})

c1.config_map(d1, {
    x: "x", 
    radius: {
        other_key: "x",
        controller: x => x/10
    },
    y: {
        other_key: "x",
        controller: x => 200 + 100 * Math.sin(x/100)
    }
}, {
    start_frame: d1.frame_in,
    end_frame: d1.frame_out
})

s1.add_assets(d1, c1)
s1.play();

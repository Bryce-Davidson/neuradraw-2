import { ctx, canvas } from './canvas';
import Scene from './Controllers/Scene';

// import CircleBasic from './Assets/Custom/Basic/CircleBasic';
// import CircelControlled from './Assets/Custom/Controlled/CircleControlled';
// import DNN from './Assets/Custom/Basic/DNN-Basic';
import DNN from './Assets/Custom/Controlled/DNN-Controlled';



// d1.draw();

var s1 = new Scene(ctx, "s1", 60, 6*1000);

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

s1.add_asset(d1)
s1.play();
import { ctx } from './canvas';
import Scene from './Controllers/Scene';

// import DNN from './Assets/Custom/Basic/DNN-Basic';
import DNN from './Assets/Custom/Controlled/DNNControlled';

var s1 = new Scene(ctx, "s1", {
    duration:1000, 
    show_frame_count:true,
    fps: 60
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

d1.to("x", 10, 30, 0);

console.log(d1.timeline.timeline)

s1.add_asset(d1)
console.log(s1)
s1.play();


// -------
// point map


// The animatoin controller is for assets whos methods are
// abtracted by the neuradraw drawing paradigm
// the timeline is the main bulk of the operation
// animation controller or another class can influencce the timeline of any object

// or have a timeline that can be influcned

// an asset can extend animatino controller which is a class with a timeline
// or an asset can just have a timeline


// A point map
// var circ = new PointMap("name", frameIn, frameOut, {
//     shape: "circle",
//     stroke_width: 1.3, 
//     fill: 'blue'
// });




// as long as something has a timeline function and a timelin
// you can hook it into scene

// circ.interpolate(startFrame, endFrame, {easing:"linear", to:"square"})
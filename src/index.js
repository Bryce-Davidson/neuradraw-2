import { ctx, canvas } from './canvas';
import mouse from './events';
import line from './Assets/Primitives/Line';
import stroke from './Controllers/Context/Cosmetic/stroke';
import { push, pop } from './Controllers/Context/State';



// import CircleBasic from './Assets/Custom/Basic/CircleBasic';
// import CircelControlled from './Assets/Custom/Controlled/CircleControlled';
import DNN from './Assets/Custom/DNN';


var nn = new DNN('dnn1', {
    x: 0,
    y: 0,
    layer_spacing: 160,
    node_spacing: 120,
    weight_colors: 'black',
    weight_thicknesses: 1.3
})

nn.add_layer(2, "green", "input", {})
nn.add_layer(3, "blue", "h_1", {})
nn.add_layer(2, "blue", "output", {})

function setup() {
    nn.draw();
}

var i=0;
function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circ.draw({
        x: circ.default.x + i,
        y: circ.default.y + Math.pow(i, 1.01)
    })
    i++;
    requestAnimationFrame(draw)
}

setup();
// draw();
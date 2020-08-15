import { ctx, canvas } from './canvas';
import mouse from './events';
import line from './Assets/Primitives/Line';
import stroke from './Controllers/Context/Cosmetic/stroke';
import { push, pop } from './Controllers/Context/State';



// import CircleBasic from './Assets/Custom/Basic/CircleBasic';
// import CircelControlled from './Assets/Custom/Controlled/CircleControlled';
import DNN from './Assets/Custom/DNN';

var nn = new DNN("dnn1", {
    
})

function setup() {
    // circ.draw()
    // line(0,0, 100,100);
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
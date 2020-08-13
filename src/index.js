import { ctx, canvas } from './canvas';
import mouse from './events';

import CircleBasic from './Assets/Custom/Basic/CircleBasic';

var circ = new CircleBasic("circ")

function draw() {
    circ.draw()
}

var i=0;
function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var j =0; j <= 5; j++) {
        circ.draw({
            x: mouse.x + 100*Math.sin(i/100 + j),
            y: mouse.y + 100*Math.cos(i/10),
            radius: 25
        })
    }
    i++;
    requestAnimationFrame(animate)
}

// draw();
animate();
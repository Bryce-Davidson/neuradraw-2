import { ctx, canvas } from './canvas';
import mouse from './events';

import Scene from './Controllers/Scene';
import CircleBasic from './Assets/Custom/Basic/CircleBasic';

var circ = new CircleBasic("circ")

function draw() {
    circ.draw()
}

// var i=0;
// function animate(time) {
//     i++;
    
//     s1.timeline(i);
//     requestAnimationFrame(animate)
// }

draw();
// window.setTimeout(()=> {
//     console.log("start")
//     animate();
// }, 2000)
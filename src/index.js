import { ctx, canvas } from './canvas';
import mouse from './events';

import Scene from './Controllers/Scene';
import CircleTest from './Assets/Custom/CircleTest';

var s1 = new Scene("s1", [], 30, 4000)
s1.set_in(100);

console.log(s1);

var circ = new CircleTest("circ1", 0, 250) 
s1.add_asset(circ)


function draw() {
      var ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
}

var i=0;
function animate(time) {
    s1.timeline(i);
    i++;
    requestAnimationFrame(animate)
}

// draw();
// window.setTimeout(()=> {
//     console.log("start")
//     animate();
// }, 2000)
// animate();
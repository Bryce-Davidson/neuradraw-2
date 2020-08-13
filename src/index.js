// const {c, canvas} = require('./canvas');
import { ctx, canvas } from './canvas';
import mouse from './meta';

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    // console.log(innerWidth, innerHeight)
})

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    ctx.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
}

animate();
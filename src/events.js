import { ctx } from './canvas';

var mouse = {}
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    // console.log(mouse.x, mouse.y)
})

addEventListener('resize', () => {
    ctx.canvas.width = innerWidth
    ctx.canvas.height = innerHeight
    console.log(innerWidth, innerHeight)
})

export default mouse;
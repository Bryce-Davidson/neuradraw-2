import { canvas } from './canvas';

var mouse = {}
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    // console.log(mouse.x, mouse.y)
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    // console.log(innerWidth, innerHeight)
})

export default mouse;
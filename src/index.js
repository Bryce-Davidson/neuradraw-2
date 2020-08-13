var canvas = document.getElementById('rendering');
var c = canvas.getContext('2d');

canvas.height = window.innerHeight; 
canvas.width = window.innerWidth; 

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

function animate() {
    requestAnimationFrame(animate)
    // place this in a clear function  
    c.clearRect(0, 0, canvas.width, canvas.height)
  
    c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
    
}

animate();
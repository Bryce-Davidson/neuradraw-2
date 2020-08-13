var canvas = document.getElementById('rendering');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight; 
canvas.width = window.innerWidth; 

module.exports = { 
    ctx, 
    canvas 
};
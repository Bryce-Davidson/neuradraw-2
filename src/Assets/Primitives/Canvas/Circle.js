import { ctx } from '../../../Meta/canvas';

export default function circle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.stroke();
}
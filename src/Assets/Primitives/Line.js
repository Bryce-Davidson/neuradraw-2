export default function line(ctx, x_1, y_1, x_2, y_2) {
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.stroke();
}
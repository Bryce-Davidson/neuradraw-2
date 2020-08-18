import AssetController from '../../../Controllers/AssetController';
import { ctx } from '../../../Meta/canvas';
export default class PointMapBasic {
    
    /**
     * 
     * @param {String} name - The name of the asset
     * @param {[[Number, Number]]} points - The points to be drawn to the canvas
     */
    constructor(name, points) {
        this.name = name;
        this.points = points;
    }

    draw() {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.points[0][0], this.points[0][1])
        for(var i=1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i][0], this.points[i][1])
            ctx.stroke();
        }
    }
}
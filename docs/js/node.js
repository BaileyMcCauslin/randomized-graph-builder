import * as Constants from "./consts.js";

export class Node {
    constructor(label,x,y,ctx) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.color = Constants.GRAPH_COLOR_DEF;
    }

    changeColor(color) {
        this.color = color;
    }

    drawText(text,xPos,yPos) {
        this.ctx.fillText(text,xPos,yPos);
    }

    drawNode() {
        this.ctx.beginPath();
        // Draw the circle. x,y,radius,start angle,end angle(360)
        this.ctx.arc(this.x, this.y, Constants.NODE_RAD, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.drawText(this.label,this.x-Constants.TEXT_OFFSET_X,
                                                this.y+Constants.TEXT_OFFSET_Y);
    }
}
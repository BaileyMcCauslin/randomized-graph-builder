export class Connection {
    constructor(startNode,endNode,ctx) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.ctx = ctx;
    }

    drawConnection() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startNode.x,this.startNode.y);
        this.ctx.lineTo(this.endNode.x,this.endNode.y);
        this.ctx.stroke();
    }
}
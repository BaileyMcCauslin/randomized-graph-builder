export class Canvas {
    constructor() {
        this.ref = document.getElementById("canvas");
        this.ctx = this.ref.getContext("2d");
    }

    // Scale the canvas by client attributes
    scaleCanvas() {
        this.ref.width = window.innerWidth;
        this.ref.height = window.innerHeight;
    }

    setColor(strokeColor,fillStyle) {
        this.ctx.strokeStyle = strokeColor;
        this.ctx.fillStyle = fillStyle;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ref.width, this.ref.height);
        this.scaleCanvas();
    }
}
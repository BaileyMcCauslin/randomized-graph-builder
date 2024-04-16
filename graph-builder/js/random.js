import { NODE_X_OFFSET, NODE_Y_OFFSET } from "./consts.js";

export class Random {
    // Get a random number between a range
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Generate a set of x,y coords(floats)
    generateRandomPos(maxHeight,maxWidth) {
        return [this.getRandomArbitrary(NODE_X_OFFSET,maxWidth),
                              this.getRandomArbitrary(NODE_Y_OFFSET,maxHeight)];
    }

    // Generate a random index(floor forces integer)
    getRandomIndex(min,max) {
        return Math.floor(this.getRandomArbitrary(min,max));
    }
}
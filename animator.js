class Animator {
	/*
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
		
		this.animationFrames = [];

    };
	*/
	
	constructor(spritesheet, frameCount, frameDuration, reverse, loop) {
		Object.assign(this, {spritesheet, frameCount, frameDuration, reverse, loop});
		
		this.elapsedTime = 0;
		this.maxWidth = 0;
		this.maxHeight = 0;
		this.totalTime = this.frameCount * this.frameDuration;
		this.animationFrames = [];
	}
	
	addFrame(newFrame) {
		if (newFrame.width > this.maxWidth) this.maxWidth = newFrame.width;
		if (newFrame.height > this.maxHeight) this.maxHeight = newFrame.height;
		
		if (this.animationFrames.length < this.frameCount) {
			this.animationFrames.push(newFrame);
		}
	};

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;
		if (this.animationFrames.length === 0) return;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
/*
        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);

*/

		this.animationFrames[frame].draw(ctx, x, y, scale);
		
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(x, y, this.maxWidth * scale, this.maxHeight * scale);
        }
    };


    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};

class SpriteFrame {
	constructor(spriteSheet, xCorner, yCorner, width, height, frameNumber, xCornerOffset, yCornerOffset) {
		Object.assign(this, {spriteSheet, xCorner, yCorner, width, height, frameNumber, xCornerOffset, yCornerOffset});
	}
	
	draw(ctx, xCanvas, yCanvas, scale) {
        ctx.drawImage(this.spriteSheet, this.xCorner, this.yCorner, this.width, this.height, xCanvas + (this.xCornerOffset * PARAMS.SCALE), yCanvas + (this.yCornerOffset * PARAMS.SCALE), this.width * scale, this.height * scale);
	}
};
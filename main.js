var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("green_dragon_sheet.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
	var ctx = canvas.getContext("2d");
	var dragon = new Dragon(gameEngine, 250, 200);

	gameEngine.init(ctx);
	
	gameEngine.addEntity(dragon);
	
	gameEngine.start();
});


class Dragon {
	constructor(gameEngine, x, y) {
		Object.assign(this, {gameEngine, x, y});
		this.gameEngine.dragon = this;
		this.spriteSheet = ASSET_MANAGER.getAsset("green_dragon_sheet.png");
		this.state = 0;  // 0 = idle, 1 = Breath Fire (Right), 2 = Breath Fire (Down), 3 = Take Off, 4 = Flying, 5 = Landing
		
		this.animations = [];
		this.loadAnimations();
	}

	loadAnimations() {
		
		// Idle Animation
		this.animations[0] = new Animator(this.spriteSheet, 7, 0.25, false, true);	
		var dragonIdleFrame1 = new SpriteFrame(this.spriteSheet, 629, 18, 76, 96, 1, 0, 0);
		this.animations[0].addFrame(dragonIdleFrame1);
		var dragonIdleFrame2 = new SpriteFrame(this.spriteSheet, 716, 18, 77, 96, 2, 0, 0);
		this.animations[0].addFrame(dragonIdleFrame2);
		var dragonIdleFrame3 = new SpriteFrame(this.spriteSheet, 801, 12, 77, 102, 3, 0, -6);
		this.animations[0].addFrame(dragonIdleFrame3);
		var dragonIdleFrame4 = new SpriteFrame(this.spriteSheet, 887, 8, 77, 106, 4, 0, -10);
		this.animations[0].addFrame(dragonIdleFrame4);
		var dragonIdleFrame5 = new SpriteFrame(this.spriteSheet, 977, 5, 76, 109, 5, 0, -13);
		this.animations[0].addFrame(dragonIdleFrame5);
		var dragonIdleFrame6 = new SpriteFrame(this.spriteSheet, 1067, 2, 76, 112, 6, 0, -16);
		this.animations[0].addFrame(dragonIdleFrame6);
		var dragonIdleFrame7 = new SpriteFrame(this.spriteSheet, 1156, 0, 76, 114, 7, 0, -18);
		this.animations[0].addFrame(dragonIdleFrame7);
		
		
		// Breathing Fire (To the Right Side)
		this.animations[1] = new Animator(this.spriteSheet, 4, 0.25, false, true);
		let xOffset1 = -69;
		let yOffset1 = 1;
		var dragonFireRightFrame1 = new SpriteFrame(this.spriteSheet, 4, 177, 141, 93, 1, xOffset1, yOffset1);
		this.animations[1].addFrame(dragonFireRightFrame1);
		var dragonFireRightFrame2 = new SpriteFrame(this.spriteSheet, 157, 158, 170, 113, 2, -2 + xOffset1, -19 + yOffset1);
		this.animations[1].addFrame(dragonFireRightFrame2);
		var dragonFireRightFrame3 = new SpriteFrame(this.spriteSheet, 337, 158, 195, 113, 3, -12 + xOffset1, -19 + yOffset1);
		this.animations[1].addFrame(dragonFireRightFrame3);
		var dragonFireRightFrame4 = new SpriteFrame(this.spriteSheet, 547, 155, 187, 116, 4, -2 + xOffset1, -22 + yOffset1);
		this.animations[1].addFrame(dragonFireRightFrame4);
		
		
		// Breathing Fire (Downward)
		this.animations[2] = new Animator(this.spriteSheet, 6, 0.2, false, true);
		let xOffset2 = -52;
		let yOffset2 = -13;	
		var dragonFireDownFrame1 = new SpriteFrame(this.spriteSheet, 4, 177, 141, 93, 1, xOffset1, yOffset1);
		this.animations[2].addFrame(dragonFireDownFrame1);
		var dragonFireDownFrame2 = new SpriteFrame(this.spriteSheet, 0, 471, 126, 108, 2, xOffset2, yOffset2);
		this.animations[2].addFrame(dragonFireDownFrame2);
		var dragonFireDownFrame3 = new SpriteFrame(this.spriteSheet, 488, 471, 137, 136, 3, xOffset2, yOffset2);
		this.animations[2].addFrame(dragonFireDownFrame3);
		var dragonFireDownFrame4 = new SpriteFrame(this.spriteSheet, 152, 471, 146, 143, 4, -6 + xOffset2, yOffset2);
		this.animations[2].addFrame(dragonFireDownFrame4);
		var dragonFireDownFrame5 = new SpriteFrame(this.spriteSheet, 321, 471, 139, 142, 5, xOffset2, yOffset2);
		this.animations[2].addFrame(dragonFireDownFrame5);
		var dragonFireDownFrame6 = new SpriteFrame(this.spriteSheet, 655, 471, 170, 199, 6, xOffset2, yOffset2);
		this.animations[2].addFrame(dragonFireDownFrame6);
		
		
		// Take Off
		this.animations[3] = new Animator(this.spriteSheet, 3, 0.15, false, true);
		let xOffset3 = -41;
		let yOffest3 = 1;
		var dragonTakeOffFrame1 = new SpriteFrame(this.spriteSheet, 878, 495, 112, 96, 1, xOffset3, yOffest3);
		this.animations[3].addFrame(dragonTakeOffFrame1);
		var dragonTakeOffFrame2 = new SpriteFrame(this.spriteSheet, 1015, 477, 146, 113, 2, -8 + xOffset3, -18 + yOffest3);
		this.animations[3].addFrame(dragonTakeOffFrame2);
		var dragonTakeOffFrame3 = new SpriteFrame(this.spriteSheet, 1182, 493, 172, 97, 3, -25 + xOffset3, -9 + yOffest3);
		this.animations[3].addFrame(dragonTakeOffFrame3);
		
		
		// Flying
		this.animations[4] = new Animator(this.spriteSheet, 3, 0.2, false, true);
		let xOffset4 = xOffset3 - 30;
		let yOffset4 = yOffest3 + 12;
		var dragonFlyFrame1 = new SpriteFrame(this.spriteSheet, 1, 731, 182, 94, 1, xOffset4, yOffset4);
		this.animations[4].addFrame(dragonFlyFrame1);
		var dragonFlyFrame2 = new SpriteFrame(this.spriteSheet, 210, 729, 182, 81, 2, xOffset4, -6 + yOffset4);
		this.animations[4].addFrame(dragonFlyFrame2);
		var dragonFlyFrame3 = new SpriteFrame(this.spriteSheet, 411, 675, 175, 135, 3, -1 + xOffset4, -64 + yOffset4);
		this.animations[4].addFrame(dragonFlyFrame3);
		
		
		// Landing
		this.animations[5] = new Animator(this.spriteSheet, 5, 0.15, false, true);
		let xOffset5 = -59;
		let yOffset5 = 2;
		var dragonLandingFrame1 = new SpriteFrame(this.spriteSheet, 610, 707, 139, 103, 1, xOffset5, yOffset5);
		this.animations[5].addFrame(dragonLandingFrame1);
		var dragonLandingFrame2 = new SpriteFrame(this.spriteSheet, 773, 703, 129, 107, 2, 6 + xOffset5, -7 + yOffset5);
		this.animations[5].addFrame(dragonLandingFrame2);
		var dragonLandingFrame3 = new SpriteFrame(this.spriteSheet, 921, 718, 110, 93, 3, 27 + xOffset5, 1 + yOffset5);
		this.animations[5].addFrame(dragonLandingFrame3);
		var dragonLandingFrame4 = new SpriteFrame(this.spriteSheet, 1046, 722, 141, 90, 4, 12 + xOffset5, 4 + yOffset5);
		this.animations[5].addFrame(dragonLandingFrame4);
		var dragonLandingFrame5 = new SpriteFrame(this.spriteSheet, 1216, 719, 131, 93, 4, 22 + xOffset5, 1 + yOffset5);
		this.animations[5].addFrame(dragonLandingFrame5);
	}

	update() {
		
		// while standing idle
		if (this.state === 0) {
			if (this.gameEngine.A) {
				this.animations[1].elapsedTime = 0;
				this.state = 1;
			} 
			if (this.gameEngine.S) {
				this.animations[2].elapsedTime = 0;				
				this.state = 2;
			} 
			if (this.gameEngine.rightArrow) {
				this.animations[3].elapsedTime = 0;				
				this.state = 3;
			}
			
		// while breathing fire to the right
		} else if (this.state === 1) {
			if (!this.gameEngine.A) {				
				this.animations[0].elapsedTime = 0;	
				this.state = 0;				
			}
			
		// while breathing fire downward
		} else if (this.state === 2) {
			if (!this.gameEngine.S) { 
				this.animations[0].elapsedTime = 0;	
				this.state = 0;				
			}
			
		// while either taking off, flying, or landing
		} else {
			if ( this.state === 3 && this.animations[3].currentFrame() === 2 && this.animations[3].elapsedTime >= this.animations[3].totalTime * 0.95) {
				this.animations[4].elapsedTime = 0;
				this.state = 4;
				this.animations[3].elapsedTime = 0;
			}
			if ( !this.gameEngine.rightArrow && (this.state === 3 || this.state === 4) ) {
				this.animations[5].elapsedTime = 0;
				this.state = 5;
			}
			if ( this.state === 5 && this.animations[5].currentFrame() === 4 && this.animations[5].elapsedTime >= this.animations[5].totalTime * 0.95 ) {
				this.animations[0].elapsedTime = 0;
				this.state = 0;
				this.animations[5].elapsedTime = 0;
			}
		}	
	}
	
	draw(ctx) {
		this.animations[this.state].drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
		
		// instruction text on canvas on how to control dragon animations
		ctx.font = '20px Arial';
		ctx.fillStyle = "Black";
		ctx.fillText("Hold A key to breath fire", 650, 500);
		ctx.fillText("Hold S key to breath fire downward", 650, 550);
		ctx.fillText("Hold Right Arrow key to fly", 650, 600);
	}
}
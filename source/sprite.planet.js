goog.provide('gravity.Planet');

goog.require('lime.Sprite');

gravity.Planet = function(radius, rotate) {
    lime.Sprite.call(this);

	this.R = radius * gravity.WIDTH / 1000;
	
    this.setSize(this.R*2, this.R*2).setAnchorPoint(.5, .5).setRotation( Math.floor(Math.random() * 360) ); 
    this.setFill('assets/planet.png');
    
	if (rotate) {
		//
		var loop = new lime.animation.Loop(
			new lime.animation.RotateBy(45).setEasing(lime.animation.getEasingFunction(0,0,0,0)).setDuration(1) //.enableOptimizations()
		);
		this.runAction(loop);
	}
	
    /*
    this.loop = new lime.animation.RotateBy(360).setEasing(lime.animation.getEasingFunction(0,0,0,0)).setDuration(4)
    this.runAction( this.loop );
    goog.events.listen(this.loop, lime.animation.Event.STOP, function() {
		this.loop.play();
	}, false, this);
    */
    
    /*
    if (!gravity.loop) {
        gravity.loop = new lime.animation.Loop(
            new lime.animation.RotateBy(45).setEasing(lime.animation.getEasingFunction(0,0,0,0))
        );
        //gravity.loop.play();
    }
    this.runAction(gravity.loop);
    */
};
goog.inherits(gravity.Planet, lime.Sprite);

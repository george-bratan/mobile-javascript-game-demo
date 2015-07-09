goog.provide('gravity.Goodie');

goog.require('lime.Sprite');

gravity.Goodie = function(rotate) {
    lime.Sprite.call(this);
        
    this.W = gravity.WIDTH / 60;
    this.H = this.W * 64 / 52;
        
    this.setSize(this.W, this.H).setAnchorPoint(.5, .5).setRotation( Math.floor(Math.random() * 360) ); 
    this.setFill('assets/satellite.png');
    
    if (rotate) {
        //
        var loop = new lime.animation.Loop(
            new lime.animation.RotateBy(-10).setEasing(lime.animation.getEasingFunction(0,0,0,0)).setDuration(1) //.enableOptimizations()
        );
        this.runAction(loop);
    }
};
goog.inherits(gravity.Goodie, lime.Sprite);

gravity.Goodie.prototype.Explode = function() {
    //
    this.getParent().appendChild( new gravity.Explosion().setPosition(this.getPosition().x, this.getPosition().y) );
    //this.getParent().removeChild(this);
    
    return this;
};

gravity.Goodie.prototype.Warp = function() {
    //
    var warp = new lime.animation.Spawn(
        new lime.animation.RotateBy(360).setDuration(1),
        new lime.animation.FadeTo(0).setDuration(1)
    );
    this.runAction( warp );
    //this.getParent().appendChild( new gravity.Explosion().setPosition(this.getPosition().x, this.getPosition().y) );
    //this.getParent().removeChild(this);
    
    return this;
};

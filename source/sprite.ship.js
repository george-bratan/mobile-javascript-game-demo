goog.provide('gravity.Ship');

goog.require('lime.Sprite');

gravity.Ship = function() {
    lime.Sprite.call(this);
        
    this.W = gravity.WIDTH / 20;
    this.H = this.W * 134 / 193;
        
    this.setSize(this.W, this.H).setAnchorPoint(.5, .5); 
    this.setFill('assets/shuttle.png');
    
    this.speed = 0;
};
goog.inherits(gravity.Ship, lime.Sprite);

gravity.Ship.prototype.Explode = function() {
    //
    this.getParent().appendChild( new gravity.Explosion().setPosition(this.getPosition().x, this.getPosition().y) );
    this.getParent().removeChild(this);
};

gravity.Ship.prototype.Warp = function(pos) {
    //
    var warp = new lime.animation.Spawn(
        new lime.animation.MoveTo(pos),
        new lime.animation.RotateBy(360).setDuration(1),
        new lime.animation.FadeTo(0).setDuration(1)
    );
    this.runAction( warp );
    //this.getParent().appendChild( new gravity.Explosion().setPosition(this.getPosition().x, this.getPosition().y) );
    //this.getParent().removeChild(this);
};

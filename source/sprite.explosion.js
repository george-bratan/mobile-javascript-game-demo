goog.provide('gravity.Explosion');

goog.require('lime.Circle');

gravity.Explosion = function() {
    lime.Circle.call(this);

    var RADIUS = 20,
        BORDER = 2;
        
    this.setAnchorPoint(.5, .5);    
        
    this.waves = [];    
    
    this.createWave();
    
    lime.scheduleManager.callAfter(function(){
        this.createWave();
    }, this, 200);
    
    lime.scheduleManager.callAfter(function(){
        this.createWave();
    }, this, 400);
};
goog.inherits(gravity.Explosion, lime.Circle);

gravity.Explosion.prototype.createWave = function() {
    //
    var RADIUS = 20,
        BORDER = 2;
        
    var
        wave = new lime.Circle().setSize(BORDER*2, BORDER*2).setAnchorPoint(.5, .5).setPosition(0, 0).setStroke(BORDER, '#FFF');
    
    var
        anim = new lime.animation.Spawn(
            new lime.animation.Resize(RADIUS*2, RADIUS*2),
            new lime.animation.FadeTo(0)
        ).setDuration(1);
    
    wave.runAction( anim );
    goog.events.listen(anim, lime.animation.Event.STOP, function() {
        this.removeChild( this.waves.shift() );
        
        if (this.waves.length == 0) {
            //
            this.getParent().removeChild(this);
        }
    }, false, this);
    this.appendChild(wave);
    
    this.waves.push(wave);
};

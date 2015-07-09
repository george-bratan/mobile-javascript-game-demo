goog.provide('gravity.Target');

goog.require('lime.Sprite');

gravity.Target = function(rotate) {
    lime.Sprite.call(this);

    this.W = gravity.WIDTH / 20;
        
    this.vortex = [];
    this.setAnchorPoint(.5, .5);
        
    /*
    this.vortex[1] = new lime.Sprite().setSize(this.W*3/4, this.W*3/4).setAnchorPoint(.5, .5);
    this.vortex[1].setFill('assets/vortex-1.png');
    this.appendChild(this.vortex[1]);
    */
    
    /*
    var loop = new lime.animation.Loop(
        new lime.animation.RotateBy(-45).setEasing(lime.animation.getEasingFunction(0,0,0,0)).setDuration(1.5)
    );
    this.vortex[1].runAction(loop);
    */
    
    this.vortex[2] = new lime.Sprite().setSize(this.W, this.W).setAnchorPoint(.5, .5); 
    this.vortex[2].setFill('assets/vortex-2.png');
    this.appendChild(this.vortex[2]);
    
    /*
    var loop = new lime.animation.Loop(
        new lime.animation.RotateBy(-45).setEasing(lime.animation.getEasingFunction(0,0,0,0)).setDuration(1)
    );
    this.vortex[2].runAction(loop);
    */
    
    this.vortex[3] = new lime.Sprite().setSize(this.W, this.W).setAnchorPoint(.5, .5); 
    this.vortex[3].setFill('assets/vortex-3.png');
    this.appendChild(this.vortex[3]);
    
    if (rotate) {
        //
        var loop = new lime.animation.Loop(
            new lime.animation.RotateBy(-45).setEasing(lime.animation.getEasingFunction(0,0,0,0)).setDuration(1) //.enableOptimizations()
        );
        this.vortex[3].runAction(loop);
    }
};
goog.inherits(gravity.Target, lime.Sprite);

gravity.Target.prototype.createWave = function() {
    //
        
    var
        wave = new lime.Circle().setSize(this.W, this.W).setAnchorPoint(.5, .5).setPosition(0, 0).setStroke(2, '#0EC755'); 
    
    var
        anim = new lime.animation.Spawn(
            new lime.animation.Resize(RADIUS*2, RADIUS*2),
            new lime.animation.FadeTo(0)
        ).setDuration(2);
    
    wave.runAction( anim );
    goog.events.listen(anim, lime.animation.Event.STOP, function() {
        this.removeChild( this.waves.shift() );
        this.createWave();
    }, false, this);
    this.appendChild(wave);
    
    this.waves.push(wave);
};
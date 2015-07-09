goog.provide('gravity');

// LIME requirements
goog.require('lime.Director');
goog.require('lime.Scene');
//goog.require('lime.transitions.MoveInUp');

// GRAVITY
goog.require('util.window');
goog.require('util.physics');
goog.require('util.storage');

goog.require('gravity.MenuScene');
goog.require('gravity.GameScene');
goog.require('gravity.BuyScene');

goog.require('gravity.pack.free');
goog.require('gravity.pack.paid');


// SETTINGS

gravity.WIDTH = 1024;
gravity.HEIGHT = 768;

gravity.BACKGROUND = '#1B285C';
gravity.FOREGROUND = '#EEEEFF';
gravity.levels = [];

gravity.settings = {};
gravity.settings.trail = false;

gravity.appid = "com.zenitsys.gravityship.paid";
gravity.debug = false;

/*
 
GRAVITY SHIP

An addictive space navigation game where you must guide your ship to the wormhole while
passing through a field of planets and asteroids that influence your speed and direction.
Collect power-ups along the way for additional points so you get that perfect score.

Gravity Ship is a very easy to learn game and it has well-balanced difficulty settings for that extra experience.
Play the initial 4 levels for free, if you like the game you can buy an additional pack of 12 levels through in-app purchase.

It comes packed with:
- Real gravitational forces acting on your ship
- Collect power-ups along the way for additional points
- Beautiful graphics
- Balanced gameplay for a rewarding experience
- Easy to get started, little to no learning curve required
- 4 free levels for you to try your skills
- 12 additional levels available via in-app purchase
- Runs on both your iPad and iPhone

Have a blast ;)

Keywords: gravity, ship, shuttle, space, asteroids, sattelite, orbital

*/

// entrypoint
gravity.start = function(){
   //
   var
      __win = util.window.size(1024, 768);
      
   
   //util.storage.clear();
   
   gravity.WIDTH = __win.width > __win.height ? __win.width : __win.height;
   gravity.HEIGHT = __win.width > __win.height ? __win.height : __win.width;
   
   util.physics.MAXSPEED = (gravity.WIDTH / 4);
   util.physics.MAXACCEL = (gravity.WIDTH / 4) / 5;
   
   util.physics.G = util.physics.MAXSPEED / 5;
   util.physics.M = util.physics.MAXSPEED / 5;
   
   delegate_setup(
      function(trxid, pid, receipt) {
         //
         console.log('Purchased: ' + pid);
         util.storage.set('gravity.pack.paid', 1);
         
         if (gravity.menu)
            gravity.loadMenu();
      },
      function(errno, errtext) {
         //
         console.log('Purchase Failed: ' + errtext + ' ('+errno+')');
         alert('Transaction failed: ' + errtext);
      }
   );
   
   gravity.director = new lime.Director(document.body, gravity.WIDTH, gravity.HEIGHT);
   
   //gravity.director.makeMobileWebAppCapable();
   gravity.webapp();
   
   gravity.setupLevels(gravity.pack.free);
   gravity.setupLevels(gravity.pack.paid);
   
   gravity.loadMenu();
   
   gravity.checkOrientation();
   goog.events.listen(goog.global, 'orientationchange',
        gravity.checkOrientation, false, this);
}

gravity.pause = function() {
   //
   gravity.director.setPaused( true );
   lime.updateDirtyObjects();
}

gravity.resume = function() {
   //
   gravity.director.setPaused( false );
}

gravity.webapp = function() {
   //
   var meta = document.createElement('meta');
   meta.name = 'apple-mobile-web-app-capable';
   meta.content = 'yes';
   document.getElementsByTagName('head').item(0).appendChild(meta);
   
   meta = document.createElement('meta');
   meta.name = 'apple-mobile-web-app-status-bar-style';
   meta.content = 'black';
   document.getElementsByTagName('head').item(0).appendChild(meta);
}

gravity.checkOrientation = function(){
   //
   var
      __win = util.window.size(1024, 768);
      
   if (!gravity.director.isPaused() && __win.width < __win.height) {
      //
      gravity.director.pauseClassFactory = gravity.OrientationScene;
	  gravity.director.setPaused( true );
		
	  lime.updateDirtyObjects();
   }
   
   if (gravity.director.isPaused() && __win.width > __win.height) {
      //
	  gravity.director.setPaused( false );
   }
}

gravity.setupLevels = function(pack){
   //
   var
      levels;
      
   levels = pack.levels();
   for (i in levels) {
      //
      levels[i].level = i;
      levels[i].galaxy = pack.name;
      levels[i].playable = pack.playable;
      
      gravity.levels.push(levels[i]); 
   }
}

gravity.loadMenu = function(levels) {
   //
   gravity.menu = new gravity.MenuScene();
      
   if (levels)
      gravity.menu.select();
   
   gravity.director.replaceScene(gravity.menu, lime.transitions.MoveInUp);
};

gravity.loadGame = function(level) {
   //
   console.log('loading:' + level);
   var trail = false;
   
   if (gravity.game) {
      if (gravity.game.level == level && gravity.game.objects.trail.length) {
         //
         trail = gravity.game.objects.trail;
      }
   }
   if (!goog.isDef(level)) {
      //
      level = -1;
      
      for (i in gravity.levels) {
         //
         if (gravity.levels[i].playable(i)) {
            //
            if (util.storage.get('level.' + i + '.points'))
               level = i;
         }  
      }
      
      if (level < gravity.levels.length-1)
         level++;
   }
   
   while (!gravity.levels[level].playable(level)) {
      level--;
   }
   
   gravity.game = new gravity.GameScene(level);
   
   if (trail) {
      gravity.game.createTrail(trail);
   }
   
   gravity.director.replaceScene(gravity.game, lime.transitions.MoveInUp);
};

gravity.purchase = function(){
   //
   delegate_purchase(
      gravity.appid,
      function(pid, title, description, price) {
         //
         console.log("PID: " + pid + ", Title: " + title + ", Description: " + description + ", Price: " + price);
         delegate_purchase_final(pid, 1);
      },
      function(pid) {
         //
         console.log("Invalid Product ID: " + pid);
      }
   );
}

gravity.swap = function(){
   //
   var x = gravity.FOREGROUND;
   gravity.FOREGROUND = gravity.BACKGROUND;
   gravity.BACKGROUND = x;
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('gravity.start', gravity.start);
goog.exportSymbol('gravity.pause', gravity.pause);
goog.exportSymbol('gravity.resume', gravity.resume);

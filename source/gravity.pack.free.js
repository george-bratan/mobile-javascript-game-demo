goog.provide('gravity.pack.free');

gravity.pack.free = {}

gravity.pack.free.name = 'Andromeda';

gravity.pack.free.playable = function(level) {
	//
	if (level < 4)
		return true;
	
	return util.storage.get('gravity.pack.paid');
}

gravity.pack.free.levels = function(){	//
	//
	var
		levels = [];
   
	levels.push({
		planets: [
		],
		goodies:[
			{x:gravity.WIDTH/2, y:gravity.HEIGHT/2}
		],
		target: {x:gravity.WIDTH*3/4, y:gravity.HEIGHT/2},
		fuel:0.5
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH/2, y:gravity.HEIGHT/2, r:40}
		],
		goodies:[
			{x:gravity.WIDTH/2, y:gravity.HEIGHT*3/4}
		],
		target: {x:gravity.WIDTH*3/4, y:gravity.HEIGHT/2},
		fuel:0.5
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH * 1.5/5, y:gravity.HEIGHT * 1/3, r:35},
			{x:gravity.WIDTH * 2.5/5, y:gravity.HEIGHT * 2/3, r:35},
			{x:gravity.WIDTH * 3.5/5, y:gravity.HEIGHT * 1/3, r:35}
		],
		goodies:[
			{x:gravity.WIDTH * 1.5/5, y:gravity.HEIGHT * 1.1/2},
			{x:gravity.WIDTH * 2.5/5, y:gravity.HEIGHT * 1/2}
		],
		target: {x:gravity.WIDTH * 4/5, y:gravity.HEIGHT * 1.1/2},
		fuel:0.3
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH*2/3, y:gravity.HEIGHT/2, r:40}
		],
		goodies:[
			{x:gravity.WIDTH*4/5, y:gravity.HEIGHT/2}
		],
		target: {x:gravity.WIDTH*1/3, y:gravity.HEIGHT/2},
		fuel:0.5
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH*6/10, y:gravity.HEIGHT/2, r:35},
			{x:gravity.WIDTH*3/10, y:gravity.HEIGHT/2, r:30}
		],
		goodies:[
			{x:gravity.WIDTH*4.5/10, y:gravity.HEIGHT/2}
		],
		target: {x:gravity.WIDTH*8/10, y:gravity.HEIGHT/2},
		fuel:0.6
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH * 3/4, y:gravity.HEIGHT * 3/4, r:40}
		],
		goodies:[
			{x:gravity.WIDTH * 3/4, y:gravity.HEIGHT * 9/10},
			{x:gravity.WIDTH * 5/6, y:gravity.HEIGHT * 3/4}
		],
		target: {x:gravity.WIDTH * 3/4, y:gravity.HEIGHT * 1/4},
		fuel:0.6
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH * 1/2, y:gravity.HEIGHT * 1.1/4, r:70},
			{x:gravity.WIDTH * 1/2, y:gravity.HEIGHT * 4/4, r:100}
		],
		goodies:[
			{x:gravity.WIDTH * 1/2, y:gravity.HEIGHT * 1/2}
		],
		target: {x:gravity.WIDTH * 3/4, y:gravity.HEIGHT * 1/2},
		fuel:0.1
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH*3/4, y:gravity.HEIGHT/2, r:40},
			{x:gravity.WIDTH*1.5/4, y:gravity.HEIGHT/2, r:40}
		],
		goodies:[
			{x:gravity.WIDTH*5/6, y:gravity.HEIGHT/2}
		],
		target: {x:gravity.WIDTH*1/4, y:gravity.HEIGHT/2},
		fuel:0.4
	});

	
	return levels;
}
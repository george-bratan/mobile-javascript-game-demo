goog.provide('gravity.pack.paid');

gravity.pack.paid = {}

gravity.pack.paid.name = 'Centaurus';

gravity.pack.paid.playable = function(level) {
	//
	return util.storage.get('gravity.pack.paid');
}

gravity.pack.paid.levels = function(){	//
	//
	var
		levels = [];
	
	levels.push({
		planets: [
			{x:gravity.WIDTH * 3/5, y:gravity.HEIGHT * 1/3, r:35},
			{x:gravity.WIDTH * 2/5, y:gravity.HEIGHT * 2/3, r:40}
		],
		goodies:[
			{x:gravity.WIDTH * 3/5, y:gravity.HEIGHT * 1/7},
			{x:gravity.WIDTH * 1/2, y:gravity.HEIGHT * 1/2},
			{x:gravity.WIDTH * 2/5, y:gravity.HEIGHT * 6/7}
		],
		target: {x:gravity.WIDTH*3/4, y:gravity.HEIGHT/2},
		fuel:1
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH/2, y:gravity.HEIGHT/2, r:50}
		],
		goodies:[
			{x:gravity.WIDTH * 1/2, y:gravity.HEIGHT * 1/5},
			{x:gravity.WIDTH * 2/6, y:gravity.HEIGHT * 1/2},
			{x:gravity.WIDTH * 1/2, y:gravity.HEIGHT * 4/5}
		],
		target: {x:gravity.WIDTH*4/5, y:gravity.HEIGHT/2},
		fuel:1
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH * 4/5, y:gravity.HEIGHT * 1/3, r:35},
			{x:gravity.WIDTH * 2/5, y:gravity.HEIGHT * 2/3, r:40}
		],
		goodies:[
			{x:gravity.WIDTH * 4/5, y:gravity.HEIGHT * 1/5},
			{x:gravity.WIDTH * 2/5, y:gravity.HEIGHT * 9/10}
		],
		target: {x:gravity.WIDTH*3/5, y:gravity.HEIGHT/2},
		fuel:1
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH*7.5/10, y:gravity.HEIGHT/2, r:35},
			{x:gravity.WIDTH*5.0/10, y:gravity.HEIGHT/2, r:35},
			{x:gravity.WIDTH*2.5/10, y:gravity.HEIGHT/2, r:35}
		],
		goodies:[
			{x:gravity.WIDTH*6.25/10, y:gravity.HEIGHT/2},
			{x:gravity.WIDTH*3.75/10, y:gravity.HEIGHT/2}
		],
		target: {x:gravity.WIDTH*9/10, y:gravity.HEIGHT/2},
		fuel:0.5
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH * 1/2, y:gravity.HEIGHT/2, r:50},
			{x:gravity.WIDTH * 3/4, y:gravity.HEIGHT/2, r:30}
		],
		goodies:[
			{x:gravity.WIDTH * 1.0/2, y:gravity.HEIGHT * 1.3/5},
			{x:gravity.WIDTH * 3.7/6, y:gravity.HEIGHT * 1.0/2},
			{x:gravity.WIDTH * 1.0/2, y:gravity.HEIGHT * 3.7/5}
		],
		target: {x:gravity.WIDTH*5/6, y:gravity.HEIGHT/2},
		fuel:1
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH * 1/3, y:gravity.HEIGHT * 1/2, r:45},
			{x:gravity.WIDTH * 2/3, y:gravity.HEIGHT * 1/3, r:35},
			{x:gravity.WIDTH * 2/3, y:gravity.HEIGHT * 2/3, r:35}
		],
		goodies:[
			{x:gravity.WIDTH * 4.5/9, y:gravity.HEIGHT * 1/2},
			{x:gravity.WIDTH * 2/3, y:gravity.HEIGHT * 1/5},
			{x:gravity.WIDTH * 2/3, y:gravity.HEIGHT * 4/5}
		],
		target: {x:gravity.WIDTH*4/5, y:gravity.HEIGHT/2},
		fuel:1
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH * 1.5/5, y:gravity.HEIGHT * 2/5, r:35},
			{x:gravity.WIDTH * 2.5/5, y:gravity.HEIGHT * 3/5, r:35},
			{x:gravity.WIDTH * 3.5/5, y:gravity.HEIGHT * 2/5, r:35}
		],
		goodies:[
			{x:gravity.WIDTH * 1.5/5, y:gravity.HEIGHT * 2.8/5},
			//{x:gravity.WIDTH * 2.5/5, y:gravity.HEIGHT * 2/5},
			{x:gravity.WIDTH * 2.5/5, y:gravity.HEIGHT * 3.8/5},
			{x:gravity.WIDTH * 3.5/5, y:gravity.HEIGHT * 2.8/5}
		],
		target: {x:gravity.WIDTH * 4/5, y:gravity.HEIGHT * 3/5},
		fuel:1
	});
	
	levels.push({
		planets: [
			{x:gravity.WIDTH * 1/2, y:gravity.HEIGHT * 1/4, r:35},
			{x:gravity.WIDTH * 1/2, y:gravity.HEIGHT * 3/4, r:35},
			{x:gravity.WIDTH * 1/4, y:gravity.HEIGHT * 1/2, r:35},
			{x:gravity.WIDTH * 3/4, y:gravity.HEIGHT * 1/2, r:35}
		],
		goodies:[
			{x:gravity.WIDTH * 1/4, y:gravity.HEIGHT * 1/3},
			{x:gravity.WIDTH * 1/4, y:gravity.HEIGHT * 2/3},
			{x:gravity.WIDTH * 3/4, y:gravity.HEIGHT * 1/3},
			{x:gravity.WIDTH * 3/4, y:gravity.HEIGHT * 2/3}
		],
		target: {x:gravity.WIDTH/2, y:gravity.HEIGHT/2},
		fuel:1
	});
	
	return levels;
}
;(function(){ // Private scope

// Node's logic, don't use browser's API or library here
Blackprint.registerNode('Graphics/visualize/canvas', function(node, iface){
	iface.title = 'Canvas Visualization';
	iface.interface = 'BPAO/Graphics/visualize/canvas';

	node.inputs = {
		Sprite: Blackprint.PortArrayOf(PIXI.Sprite)
	}

	node.outputs = {
		VideoTrack: MediaStreamTrack
	}
});

// For Browser Interface, let ScarletsFrame handle this (HotReload available here)
Blackprint.registerInterface('BPAO/Graphics/visualize/canvas', function(iface){
	var IM = iface; // Lazy Shortcut :3

	const {
		IInput, IOutput, IProperty, // Port interface
		Input, Output, Property, // Port value
	} = iface.const;

	IM.init = function(){
		// Initialize and save data to iface
		// So it can persist if current scope is hot reloaded

		IM.app = new PIXI.Application();
		IM.container = IM.app.stage;
		IM.canvas = IM.app.view;
		IM.childs = new Map();
		IM.mediaStream = IM.canvas.captureStream();

		Output.VideoTrack = IM.mediaStream.getVideoTracks()[0];

		IM.app.renderer.resize(512, 256);
		IM.app.stop();

		IM.hotReloaded();
	}

	IM.hotReloaded = function(){
		$(IM.canvas).insertBefore(IM.$el('.left-port')[0]);
	}

	// If current component is being used on multiple container
	IM.initClone = function(el){
		var app = new PIXI.Renderer();
		$(app.view).insertBefore($('.left-port', el)[0]);
		app.resize(IM.canvas.width, IM.canvas.height);

		// For destroying
		app.view.app = app;
		app.view.onPixiTicker = function(){
			app.render(IM.container);
		}

		IM.app.ticker.add(app.view.onPixiTicker);
	}

	IInput.Sprite.off('value').on('value', function(port){
		var child = Object.create(port.value);
		child.parent = null;

		IM.childs.set(port.value, child);
		IM.app.stage.addChild(child);

		IM.app.start();
	});

	IInput.Sprite.off('disconnect').on('disconnect', function(port){
		var child = IM.childs.get(port.value);
		IM.childs.delete(port.value);

		IM.app.stage.removeChild(child);
		if(this.cables.length === 0)
			IM.app.stop();
	});

	IM.destroyClone = function(el){
		// Destroy cloned Pixi App
		var el = $('canvas', el)[0];
		el.app.destroy();

		IM.app.ticker.remove(el.onPixiTicker);
	}
});

})(); // End of private scope
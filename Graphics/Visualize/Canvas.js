Blackprint.registerNode('Graphics/Visualize/Canvas',
class CanvasNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Graphics/Visualize/Canvas');
		iface.title = 'Canvas Visualization';

		this.input = {
			Sprite: Blackprint.Port.ArrayOf(PIXI.Sprite)
		}

		this.output = {
			VideoTrack: MediaStreamTrack
		}
	}
});

var _Canvas_firstInit = true;
Blackprint.registerInterface('BPIC/Graphics/Visualize/Canvas',
Context.IFace.Canvas = class CanvasIFace extends Blackprint.Interface {
	init(){
		var My = this; // Lazy Shortcut :3

		const {
			IInput, IOutput, IProperty, // Port interface
			Input, Output, Property, // Port value
		} = My.const;

		// Initialize and save data to iface
		// So it can persist if current scope is hot reloaded

		let time;
		if(_Canvas_firstInit) time = Date.now();

		My.app = new PIXI.Application(); // First init would be slow
		My.app.ticker.maxFPS = 25;
		My.app.ticker.minFPS = 1;

		if(_Canvas_firstInit){
			if(window.SmallNotif)
				SmallNotif.add("Pixi.js took: "+(Date.now() - time)+'ms');
			else console.log("Pixi.js initialization took: "+(Date.now() - time)+'ms');

			_Canvas_firstInit = false;
		}

		My.container = My.app.stage;
		My.canvas = My.app.view;
		My.childs = new Map();
		My.mediaStream = My.canvas.captureStream();

		Output.VideoTrack = My.mediaStream.getVideoTracks()[0];

		My.app.renderer.resize(512, 256);
		My.app.stop();

		My.hotReloaded();

		IInput.Sprite.off('value').on('value', function(port){
			var child = Object.create(port.value);
			child.parent = null;

			My.childs.set(port.value, child);
			My.app.stage.addChild(child);

			My.app.start();
		});

		IInput.Sprite.off('disconnect').on('disconnect', function(port){
			var child = My.childs.get(port.value);
			My.childs.delete(port.value);

			My.app.stage.removeChild(child);
			if(this.cables.length === 0)
				My.app.stop();
		});
	}

	hotReloaded(){
		$(this.canvas).insertBefore(this.$el('.left-port')[0]);
	}
});
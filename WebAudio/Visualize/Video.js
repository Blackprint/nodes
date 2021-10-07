Blackprint.registerNode('WebAudio/Visualize/Video',
class VideoNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/WebAudio/Visualize/Video');
		iface.title = 'Video Visualization';

		this.input = {
			MediaStream: MediaStream,
			VideoTrack: MediaStreamTrack,
		}
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Visualize/Video',
Context.IFace.Video = class VideoIFace extends Blackprint.Interface {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		this.player ??= document.createElement('video');
		this.stream ??= null;
	}

	// Also put stream data on cloned node, or when HTML hot reload
	init(){
		const {
			IInput, IOutput, IProperty, // Port interface
			Input, Output, Property, // Port value
		} = this.const;

		var My = this;

		IInput.VideoTrack.off('value').on('value', function(port){
			IInput.MediaStream.disconnectAll();

			My.stream = new MediaStream([port.value]);
			My.videoElement.prop('srcObject', My.stream);
			My.videoElement.trigger('play', void 0, true);
		});

		IInput.MediaStream.off('value').on('value', function(port){
			IInput.VideoTrack.disconnectAll();

			My.stream = port.value;
			My.videoElement.prop('srcObject', My.stream);
			My.videoElement.trigger('play', void 0, true);
		});

		function disconnect(port){
			if(IInput.VideoTrack.cables.length === 0 && IInput.MediaStream.cables.length === 0){
				My.videoElement.prop('srcObject', null);
				My.videoElement.trigger('pause', void 0, true);
				My.stream = null;
			}
		}

		IInput.VideoTrack.off('disconnect').on('disconnect', disconnect);
		IInput.MediaStream.off('disconnect').on('disconnect', disconnect);
	}

	get videoElement(){
		return this._videoElement;
	}
	set videoElement(val){
		if(val == null)
			return this._videoElement = $([]);

		if(val.addClass === void 0)
			val = $(val);

		this._videoElement = val;
		val.prop('srcObject', this.stream);

		// Call el.play() on every element
		val.trigger('play', void 0, true);
	}

	initClone(){ this.init() }
	hotReloadedHTML(){ this.init() }
});
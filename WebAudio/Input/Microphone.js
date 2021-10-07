// Node-> WebAudio/Input/Microphone
Blackprint.registerNode('WebAudio/Input/Microphone',
class MicrophoneNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/WebAudio/Input/Microphone');
		iface.title = 'Microphone';

		// Blackprint Node Output
		this.output = { Node: AudioNode };
	}
});

// Interface-> BPIC/WebAudio/Input/Microphone
Blackprint.registerInterface('BPIC/WebAudio/Input/Microphone',
Context.IFace.Microphone = class MicrophoneIFace extends Blackprint.Interface {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		if(this.devices !== void 0) return;

		this.selected = 0; // Default, first option
		this.devices = [];
		this._waitForInit = false;
		this.stream = null;
	}

	init(){
		let iface = this;
		iface._refreshList();

		iface.output.Node
			.off('connecting disconnect')
			.on('connecting', function(port, enable){
				// undefined = Mark cable connection as disabled
				// true = Mark cable connection as enabled
				// false = Mark cable connection as failed
				enable(undefined);
				iface.startStream(enable); // Callback
			})
			.on('disconnect', function(port, cable){
				// Stop any stream when it doesn't have cable anymore
				if(iface.output.Node.cables.length === 0)
					iface.stopStream();
			});
	}

	async _refreshList(){
		let devices = await navigator.mediaDevices.enumerateDevices();
		var list = [];
		var ids = new Set();

		for (var i = 0; i < devices.length; i++) {
			if(devices[i].kind === 'audioinput'){ // Microphone only
				// Avoid duplicate
				var id = devices[i].groupId;
				if(id){
					if(ids.has(id)) continue;
					ids.add(id);
				}

				list.push({
					i: list.length,
					label: (devices[i].label || 'Device'),
					device: devices[i]
				});
			}
		}

		this.devices = list; // Put them here, ScarletsFrame will handle the HTML binding
		this._waitForInit && this._waitForInit();
	}

	select(which){
		if(this.selected === which) return;
		let old = this.selected;

		this.selected = which;
		this.stopStream();

		let iface = this;
		iface.output.Node.disableCables(true);
		this.startStream(function(success){
			if(!success) return this.selected = old;

			// Only reset when success
			iface.output.Node.disableCables(false);
		});
	}

	async startStream(callback){
		var selected = this.devices[this.selected].device;
		if(this.stream !== null)
			return callback(true);

		if(this.devices.length === 0){
			// Wait for initialization
			this._waitForInit = function(){
				this.startStream(callback);
			}

			return;
		}

		try {
			this.stream = await navigator.mediaDevices.getUserMedia({audio: selected});
			this.node.output.Node = ScarletsMedia.audioContext.createMediaStreamSource(this.stream);

			// Refresh again in case if the list was changed after user
			// give the permission
			this._refreshList();
			callback(true);
		} catch(e) {
			callback(false);
			throw e;
		}
	}

	stopStream(){
		if(this.stream === null)
			return;

		this.stream.getTracks().forEach(track=> track.stop());
		this.stream = null;
	}
});
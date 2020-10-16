;(function(){ // Private scope

// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/input/microphone', function(node, iface){
	iface.title = 'Microphone';
	iface.interface = 'BPAO/WebAudio/input/microphone';

	node.outputs = {
		Node: AudioNode
	};
});

// For Browser Interface, let ScarletsFrame handle this (HotReload available here)
Blackprint.registerInterface('BPAO/WebAudio/input/microphone', function(iface){
	iface.selected = '0'; // Default, first option
	iface.devices = [];

	var waitForInit = false;
	iface.init = iface.hotReloaded = function(){
		navigator.mediaDevices.enumerateDevices().then(function(devices){
			var list = iface.devices;

			var ids = new Set();
			for (var i = 0; i < devices.length; i++) {
				if(devices[i].kind === 'audioinput'){
					// Avoid duplicate
					if(devices[i].label){
						var id = devices[i].label.match(/\([a-f0-9]:[a-f0-9]\)/);
						if(id){
							if(ids.has(id))
								continue;

							ids.add(id);
						}
					}

					list.push({
						i:i,
						label:(devices[i].label || 'Device'),
						device:devices[i]
					});
				}
			}

			waitForInit && waitForInit();
		});
	}

	// Clear event listener before re-register it
	iface.hotReloading = function(){
		iface.outputs.Node.off('connecting disconnect');
	}

	iface.outputs.Node.on('connecting', function(port, enable){
		iface.startStream(enable);
		enable(undefined); // Mark as async
	}).on('disconnect', function(port, cable){
		if(iface.outputs.Node.cables.length === 0)
			stopStream();
	});

	iface.stream = null;
	iface.startStream = function(callback){
		if(iface.stream !== null)
			return callback(true);

		if(iface.devices.length === 0){
			// Wait for initialization
			waitForInit = function(){
				iface.startStream(callback);
			}

			return;
		}

		var selected = iface.devices[iface.selected].device;
		navigator.mediaDevices.getUserMedia({audio: selected}).then(function(stream){
			iface.stream = stream;
			iface.node.outputs.Node = ScarletsMedia.audioContext.createMediaStreamSource(stream);

			callback(true);
		}).catch(function(e){
			callback(false);
			throw e;
		});
	}

	function stopStream(){
		if(iface.stream === null)
			return;

		iface.stream.getTracks().forEach(function(track){
			track.stop();
		});

		iface.stream = null;
	}
});

// End of private scope
})();
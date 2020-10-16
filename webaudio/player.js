;(function(){ // Private scope

// Node's logic, don't use browser's API or library here
Blackprint.registerNode('WebAudio/player', function(node, iface){
	iface.title = 'Media Player';
	iface.description = 'WebAudio media player';
	iface.interface = 'BPAO/WebAudio/player';

	node.outputs = {
		AudioNode: AudioNode,
		Element: HTMLVideoElement,
		VideoTrack: MediaStreamTrack,
		AudioTrack: MediaStreamTrack
	};

	node.inputs = {
		URL: String,
		Play: Blackprint.PortTrigger(function(){
			iface.player.play();
		}),
		Pause: Blackprint.PortTrigger(function(){
			iface.player.pause();
		}),
	}
});

// For Browser Interface, let ScarletsFrame handle this (HotReload available here)
Blackprint.registerInterface('BPAO/WebAudio/player', function(iface){
	iface.player = null;

	iface.init = function(){
		iface.player = document.createElement('video');
		iface.player.crossOrigin = 'anonymouse';
		iface.player.preload = 'auto';
		iface.player.autoload = true;

		iface.node.outputs.Element = iface.player;
		iface.node.outputs.AudioNode = ScarletsMedia.audioContext.createMediaElementSource(iface.player);

		// Fix video sync
		iface.node.outputs.AudioNode.connect(fakeDestination);

		// Update tracks after the file is playable
		iface.player.oncanplay = function(){
			var mediaStream = iface.player.captureStream();
			iface.node.outputs.AudioTrack = mediaStream.getAudioTracks()[0];
			iface.node.outputs.VideoTrack = mediaStream.getVideoTracks()[0];

			iface.player.pause();
		}
	}

	iface.inputs.URL.on('value', function(port){
		iface.player.src = port.value;
	})
});

// End of private scope
})();
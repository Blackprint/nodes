;(function(){ // Private scope

// Node's logic, don't use browser's API or library here
Blackprint.registerNode('WebAudio/visualize/video', function(node, iface){
	iface.title = 'Video Visualization';
	iface.interface = 'BPAO/WebAudio/visualize/video';

	node.inputs = {
		MediaStream: MediaStream,
		VideoTrack: MediaStreamTrack,
	}
});

// For Browser Interface, let ScarletsFrame handle this (HotReload available here)
Blackprint.registerInterface('BPAO/WebAudio/visualize/video', function(iface){
	var IM = iface; // Lazy shortcut :3
	const {
		IInput, IOutput, IProperty, // Port interface
		Input, Output, Property, // Port value
	} = IM.const; // IM.const === iface.const

	IM.player = null;
	IM.stream = new MediaStream()

	// Also put stream data on cloned node, or when HTML hot reload
	IM.init = IM.initClone = IM.hotReloadedHTML = function(){
		IM.player = IM.$el('video');
		IM.player.prop('srcObject', IM.stream);

		// Call el.play() on every element
		IM.player.trigger('play', void 0, true);
	}

	IInput.VideoTrack.on('value', function(port){
		IInput.MediaStream.disconnectAll();

		IM.stream = new MediaStream([port.value]);
		IM.player.prop('srcObject', IM.stream);
		IM.player.trigger('play', void 0, true);
	});

	IInput.MediaStream.on('value', function(port){
		IInput.VideoTrack.disconnectAll();

		IM.stream = port.value;
		IM.player.prop('srcObject', IM.stream);
		IM.player.trigger('play', void 0, true);
	});

	function disconnect(port){
		if(IInput.VideoTrack.cables.length === 0
		   && IInput.MediaStream.cables.length === 0)
			IM.player.trigger('pause', void 0, true);
	}

	IInput.VideoTrack.off('disconnect').on('disconnect', disconnect);
	IInput.MediaStream.off('disconnect').on('disconnect', disconnect);
});

// End of private scope
})();
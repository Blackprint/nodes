;(function(){ // Private scope

// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/output/destination', function(handle, node){
	node.title = 'Destination';
	node.description = 'WebAudio destination';
	node.interface = 'BPAO/WebAudio/output/destination';

	handle.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};
});

Blackprint.registerInterface('BPAO/WebAudio/output/destination', {
	template: 'Blackprint/nodes/default'
}, function(self){
	var destination = ScarletsMedia.audioContext.destination;

	self.init = self.hotReloaded = function(){
		self.off('cable.connect');
		self.on('cable.connect', function(port1, port2, cable){
			if(port1 === self.inputs.In)
				port2.value.connect(destination);
		});

		self.off('cable.disconnect');
		self.on('cable.disconnect', function(port1, port2, cable){
			if(port1 === self.inputs.In)
				port2.value.disconnect(destination);
		});
	}
});

// End of private scope
})();
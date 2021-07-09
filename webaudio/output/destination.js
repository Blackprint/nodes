// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/output/destination', function(node, iface){
	iface.title = 'Destination';
	iface.description = 'WebAudio destination';
	iface.interface = 'BPAO/WebAudio/output/destination';

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};
});

Blackprint.registerInterface('BPAO/WebAudio/output/destination', {
	template: 'Blackprint/nodes/default.sf'
}, function(iface){
	var destination = ScarletsMedia.audioContext.destination;

	iface.init = iface.hotReloaded = function(){
		iface.off('cable.connect');
		iface.on('cable.connect', function(port1, port2, cable){
			if(port1 === iface.inputs.In)
				port2.value.connect(destination);
		});

		iface.off('cable.disconnect');
		iface.on('cable.disconnect', function(port1, port2, cable){
			if(port1 === iface.inputs.In)
				port2.value.disconnect(destination);
		});
	}
});
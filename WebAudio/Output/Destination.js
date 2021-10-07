Blackprint.registerNode('WebAudio/Output/Destination',
class DestinationNode extends Blackprint.Node {
	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/WebAudio/Output/Destination');
		iface.title = 'Destination';
		iface.description = 'WebAudio destination';

		this.input = {
			In: Blackprint.Port.ArrayOf(AudioNode)
		};
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Output/Destination',
Context.IFace.Destination = class DestinationIFace extends Blackprint.Interface {
	init(){
		var destination = ScarletsMedia.audioContext.destination;
		let iface = this;

		iface.off('cable.connect');
		iface.on('cable.connect', function(port1, port2, cable){
			if(port1 === iface.input.In)
				port2.value.connect(destination);
		});

		iface.off('cable.disconnect');
		iface.on('cable.disconnect', function(port1, port2, cable){
			if(port1 === iface.input.In)
				port2.value.disconnect(destination);
		});
	}

	hotReloaded(){
		this.init();
	}
});
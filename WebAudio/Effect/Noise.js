// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/Effect/Noise', function(node, iface){
	iface.title = 'Noise';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/Effect/Noise';

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/Effect/Noise', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.noise();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
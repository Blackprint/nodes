// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/Effect/StereoPanner', function(node, iface){
	iface.title = 'StereoPanner';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/Effect/StereoPanner';

	iface.data = {
		set: 1, // 0 ~ 1
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/Effect/StereoPanner', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.stereoPanner();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
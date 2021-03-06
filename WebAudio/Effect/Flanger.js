// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/Effect/Flanger', function(node, iface){
	iface.title = 'Flanger';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/Effect/Flanger';

	iface.data = {
		mix: 0.5, // 0 ~ 1
		time: 0.45, // 0 ~ 1
		speed: 0.2, // 0 ~ 1
		depth: 0.1, // 0 ~ 1
		feedback: 1.1, // 0 ~ 1
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/Effect/Flanger', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.flanger();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
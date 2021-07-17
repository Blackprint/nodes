// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/Effect/Tremolo', function(node, iface){
	iface.title = 'Tremolo';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/Effect/Tremolo';

	iface.data = {
		mix: 0.8, // 0 ~ 1
		speed: 0.2, // 0 ~ 3
		depth: 1, // 0 ~ 3
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/Effect/Tremolo', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.tremolo();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
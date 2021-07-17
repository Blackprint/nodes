// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/Effect/Delay', function(node, iface){
	iface.title = 'Delay';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/Effect/Delay';

	iface.data = {
		mix: 0.5, // 0 ~ 1
		time: 0.3, // 0 ~ 180
		feedback: 0.5, // 0 ~ 1
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/Effect/Delay', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.delay();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
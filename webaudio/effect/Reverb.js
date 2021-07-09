// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/effect/Reverb', function(node, iface){
	iface.title = 'Reverb';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/effect/Reverb';

	iface.options = {
		mix: 1, // 0 ~ 1
		time: 1, // 0 ~ 3
		decay: 0.1, // 0 ~ 3
		reverse: false, // boolean
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/effect/Reverb', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.reverb();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/effect/Distortion', function(node, iface){
	iface.title = 'Distortion';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/effect/Distortion';

	iface.options = {
		set: 0.5, // 0 ~ 1
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/effect/Distortion', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.distortion();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
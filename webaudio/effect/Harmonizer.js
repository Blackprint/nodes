// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/effect/Harmonizer', function(node, iface){
	iface.title = 'Harmonizer';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/effect/Harmonizer';

	iface.options = {
		pitch: 34, // 0 ~ 1
		slope: 0.65, // 0 ~ 1
		width: 0.15, // 0 ~ 1
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/effect/Harmonizer', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.harmonizer();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
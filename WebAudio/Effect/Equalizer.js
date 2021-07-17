// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/Effect/Equalizer', function(node, iface){
	iface.title = 'Equalizer';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/Effect/Equalizer';

	iface.data = {
		frequency: 0.7,
		decibel: 0.5, // -20 ~ 20
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/Effect/Equalizer', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.equalizer();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
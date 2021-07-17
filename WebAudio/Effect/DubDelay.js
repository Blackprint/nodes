// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/Effect/DubDelay', function(node, iface){
	iface.title = 'DubDelay';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/Effect/DubDelay';

	iface.options = {
		mix: 0.5, // 0 ~ 1
		time: 0.7, // 0 ~ 180
		feedback: 0.5, // 0 ~ 1
		cutoff: 700, // 0 ~ 4000
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/Effect/DubDelay', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.dubDelay();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
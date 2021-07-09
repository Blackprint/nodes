// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/effect/ConReverb', function(node, iface){
	iface.title = 'ConReverb';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/effect/ConReverb';

	iface.options = {
		bufferFileURL: String, // 0~1
		mix: 0.5,
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/effect/ConReverb', {
	template: 'Blackprint/nodes/default.sf',
	extend: Blackprint.Addons.WebAudio.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.conReverb();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
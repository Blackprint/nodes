// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/Effect/CutOff', function(node, iface){
	iface.title = 'CutOff';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/Effect/CutOff';

	iface.data = {
		type: String, // lowpass | highpass | midpass
		frequency: 350, // Filter node's frequency value
		width: 1, // Filter node's Q value
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/Effect/CutOff', {
	template: 'Blackprint/nodes/default.sf',
	extend: Context.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.cutOff();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});
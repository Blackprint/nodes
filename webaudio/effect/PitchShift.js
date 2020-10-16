;(function(){ // Private scope

// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/effect/PitchShift', function(node, iface){
	iface.title = 'PitchShift';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/effect/PitchShift';

	iface.options = {
		shift: 0, // -3 ~ 3
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/effect/PitchShift', {
	template: 'Blackprint/nodes/default',
	extend: Blackprint.Addons.WebAudio.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.pitchShift();
	iface.input = iface.effect.input;
	iface.output = iface.effect.output;

	// Custom bind for ScarletsFrame with ScarletsMediaEffect object
	customEffectFunctionBind(iface);

	iface.init = function(){
		iface.super(); // Call parent function

		iface.node.outputs.Out = iface.output;
	}
});

// End of private scope
})();
;(function(){ // Private scope

// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/effect/Chorus', function(node, iface){
	iface.title = 'Chorus';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/effect/Chorus';

	iface.options = {
		mix: 0.5,
		rate: 0, // 0~1
		intensity: 0.75, // 0~1
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/effect/Chorus', {
	template: 'Blackprint/nodes/default',
	extend: Blackprint.Addons.WebAudio.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.chorus();
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
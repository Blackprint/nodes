;(function(){ // Private scope

// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/effect/DubDelay', function(node, iface){
	iface.title = 'DubDelay';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/effect/DubDelay';

	iface.options = {
		volume: 0.5, // First volume
		time: 0.7, // seconds
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode),
		Start: Blackprint.PortTrigger(function(){
			iface.effect.in(iface.options.volume, iface.options.time, node.outputs.Finish);
		})
	};

	node.outputs = {
		Out: AudioNode,
		Finish: Function
	};
});

Blackprint.registerInterface('BPAO/WebAudio/effect/DubDelay', {
	template: 'Blackprint/nodes/default',
	extend: Blackprint.Addons.WebAudio.MediaEffect
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

// End of private scope
})();
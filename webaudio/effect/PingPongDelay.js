;(function(){ // Private scope

// Just some logic to handle, can be used for browser/non-browser
Blackprint.registerNode('WebAudio/effect/PingPongDelay', function(node, iface){
	iface.title = 'PingPongDelay';
	iface.description = 'WebAudio Effect';
	iface.interface = 'BPAO/WebAudio/effect/PingPongDelay';

	iface.options = {
		mix: 0.5,
		time: 0.3, // 0~180
		feedback: 0.5, // 0~1
	};

	node.inputs = {
		In: Blackprint.PortArrayOf(AudioNode)
	};

	node.outputs = {
		Out: AudioNode
	};
});

Blackprint.registerInterface('BPAO/WebAudio/effect/PingPongDelay', {
	template: 'Blackprint/nodes/default',
	extend: Blackprint.Addons.WebAudio.MediaEffect
}, function(iface){
	iface.effect = ScarletsMediaEffect.pingPongDelay();
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
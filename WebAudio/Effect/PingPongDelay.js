Blackprint.registerNode('WebAudio/Effect/PingPongDelay',
class PingPongDelayNode extends Blackprint.Node {
	constructor(instance){
		super(instance);
		let iface = this.setInterface('BPIC/WebAudio/Effect/PingPongDelay');

		iface.title = 'PingPongDelay';
		iface.description = 'WebAudio Effect';

		iface.data = {
			mix: 0.5,
			time: 0.3, // 0~180
			feedback: 0.5, // 0~1
		};

		this.input = {
			In: Blackprint.Port.ArrayOf(AudioNode)
		};

		this.output = {
			Out: AudioNode
		};
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Effect/PingPongDelay',
Context.IFace.PingPongDelay = class PingPongDelayIFace extends Context.MediaEffect {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		this.effect = ScarletsMediaEffect.pingPongDelay();
		this.audioInput = this.effect.input;
		this.audioOutput = this.effect.output;
	}

	init(){
		super.init(); // Call parent function
		this.node.output.Out = this.audioOutput;

		// Custom bind for ScarletsFrame with ScarletsMediaEffect object
		customEffectFunctionBind(this);
	}
});
Blackprint.registerNode('WebAudio/Effect/DubDelay',
class DubDelayNode extends Blackprint.Node {
	constructor(instance){
		super(instance);
		let iface = this.setInterface('BPIC/WebAudio/Effect/DubDelay');

		iface.title = 'DubDelay';
		iface.description = 'WebAudio Effect';

		iface.data = {
			mix: 0.5, // 0 ~ 1
			time: 0.7, // 0 ~ 180
			feedback: 0.5, // 0 ~ 1
			cutoff: 700, // 0 ~ 4000
		};

		this.input = {
			In: Blackprint.Port.ArrayOf(AudioNode)
		};

		this.output = {
			Out: AudioNode
		};
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Effect/DubDelay',
Context.IFace.DubDelay = class DubDelayIFace extends Context.MediaEffect {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		this.effect = ScarletsMediaEffect.dubDelay();
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
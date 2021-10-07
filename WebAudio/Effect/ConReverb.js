Blackprint.registerNode('WebAudio/Effect/ConReverb',
class ConReverbNode extends Blackprint.Node {
	constructor(instance){
		super(instance);
		let iface = this.setInterface('BPIC/WebAudio/Effect/ConReverb');

		iface.title = 'ConReverb';
		iface.description = 'WebAudio Effect';

		iface.data = {
			bufferFileURL: String, // 0~1
			mix: 0.5,
		};

		this.input = {
			In: Blackprint.Port.ArrayOf(AudioNode)
		};

		this.output = {
			Out: AudioNode
		};
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Effect/ConReverb',
Context.IFace.ConReverb = class ConReverbIFace extends Context.MediaEffect {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		this.effect ??= ScarletsMediaEffect.conReverb();
		this.audioInput ??= this.effect.input;
		this.audioOutput ??= this.effect.output;
	}

	init(){
		super.init(); // Call parent function
		this.node.output.Out = this.audioOutput;

		// Custom bind for ScarletsFrame with ScarletsMediaEffect object
		customEffectFunctionBind(this);
	}
});
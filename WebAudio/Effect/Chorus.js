Blackprint.registerNode('WebAudio/Effect/Chorus',
class ChorusNode extends Blackprint.Node {
	constructor(instance){
		super(instance);
		let iface = this.setInterface('BPIC/WebAudio/Effect/Chorus');

		iface.title = 'Chorus';
		iface.description = 'WebAudio Effect';

		iface.data = {
			mix: 0.5,
			rate: 0, // 0~1
			intensity: 0.75, // 0~1
		};

		this.input = {
			In: Blackprint.Port.ArrayOf(AudioNode)
		};

		this.output = {
			Out: AudioNode
		};
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Effect/Chorus',
Context.IFace.Chorus = class ChorusIFace extends Context.MediaEffect {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		this.effect ??= ScarletsMediaEffect.chorus();
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
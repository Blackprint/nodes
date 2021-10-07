Blackprint.registerNode('WebAudio/Effect/Harmonizer',
class HarmonizerNode extends Blackprint.Node {
	constructor(instance){
		super(instance);
		let iface = this.setInterface('BPIC/WebAudio/Effect/Harmonizer');

		iface.title = 'Harmonizer';
		iface.description = 'WebAudio Effect';

		iface.data = {
			pitch: 34, // 0 ~ 1
			slope: 0.65, // 0 ~ 1
			width: 0.15, // 0 ~ 1
		};

		this.input = {
			In: Blackprint.Port.ArrayOf(AudioNode)
		};

		this.output = {
			Out: AudioNode
		};
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Effect/Harmonizer',
Context.IFace.Harmonizer = class HarmonizerIFace extends Context.MediaEffect {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		this.effect = ScarletsMediaEffect.harmonizer();
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
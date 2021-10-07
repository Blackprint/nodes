Blackprint.registerNode('WebAudio/Effect/Equalizer',
class EqualizerNode extends Blackprint.Node {
	constructor(instance){
		super(instance);
		let iface = this.setInterface('BPIC/WebAudio/Effect/Equalizer');

		iface.title = 'Equalizer';
		iface.description = 'WebAudio Effect';

		iface.data = {
			frequency: 0.7,
			decibel: 0.5, // -20 ~ 20
		};

		this.input = {
			In: Blackprint.Port.ArrayOf(AudioNode)
		};

		this.output = {
			Out: AudioNode
		};
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Effect/Equalizer',
Context.IFace.Equalizer = class EqualizerIFace extends Context.MediaEffect {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		this.effect = ScarletsMediaEffect.equalizer();
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
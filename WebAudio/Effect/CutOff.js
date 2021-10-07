Blackprint.registerNode('WebAudio/Effect/CutOff',
class CutOffNode extends Blackprint.Node {
	constructor(instance){
		super(instance);
		let iface = this.setInterface('BPIC/WebAudio/Effect/CutOff');

		iface.title = 'CutOff';
		iface.description = 'WebAudio Effect';

		iface.data = {
			type: String, // lowpass | highpass | midpass
			frequency: 350, // Filter node's frequency value
			width: 1, // Filter node's Q value
		};

		this.input = {
			In: Blackprint.Port.ArrayOf(AudioNode)
		};

		this.output = {
			Out: AudioNode
		};
	}
});

Blackprint.registerInterface('BPIC/WebAudio/Effect/CutOff',
Context.IFace.CutOff = class CutOffIFace extends Context.MediaEffect {
	constructor(node){
		super(node);

		// Constructor for Interface can be executed twice when using Cloned Container
		this.effect = ScarletsMediaEffect.cutOff();
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
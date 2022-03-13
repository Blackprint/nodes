Blackprint.registerNode("Data/Number/To/String",
class NumString extends Blackprint.Node {
	static input = { In: Number, Radix: Number };
	static output = { Out: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Number to String";
		iface.element = $('<i class="fa fa-magic"></i>')[0];
		iface.showPortName = true;
	}

	update(){
		let ref = this.ref;
		let { In, Radix } = ref.Input;

		if(In == null) return;
		ref.Output.Out = In.toString(Radix);
	}
});
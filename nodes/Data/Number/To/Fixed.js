Blackprint.registerNode("Data/Number/To/Fixed",
class NumFixed extends Blackprint.Node {
	static input = { In: Number, Precision: Number };
	static output = { Out: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "To Fixed";
		iface.description = "Number";
	}

	update(){
		let ref = this.ref;
		let { In, Precision } = ref.Input;

		if(In == null) return;
		ref.Output.Out = Number(In.toFixed(Precision));
	}
});
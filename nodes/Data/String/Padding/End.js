Blackprint.registerNode("Data/String/Padding/End",
class EmptyNode extends Blackprint.Node {
	static input = { A: String, B: Number };
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Padding End";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Result = A.padEnd(B);
	}
});
Blackprint.registerNode("Data/Number/Compare/Less Than",
class EmptyNode extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Number: Less Than";
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A < B;
	}
});
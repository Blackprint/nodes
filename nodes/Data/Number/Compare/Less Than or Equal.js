Blackprint.registerNode("Data/Number/Compare/Less Than or Equal",
class EmptyNode extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Number: Less Than or Equal";
		iface.element = $('<i class="fa fa-less-than-equal"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A <= B;
	}
});
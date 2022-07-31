/**
 * Returns the value of A to the power of B.
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/PowerOf",
class extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Number: PowerOf";
	}

	createIcon(){
		return $('<i class="fa fa-superscript"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A ** B;
	}
});
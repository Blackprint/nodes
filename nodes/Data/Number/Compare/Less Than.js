/**
 * Return true if A is less than with B (A < B)
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/Compare/Less Than",
class extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Number: Less Than";
	}

	createIcon(){
		return $('<i class="fa fa-less-than"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A < B;
	}
});
/**
 * Compare and return true if both value is not similar
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/Compare/Not Equal",
class extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Number: Not Equal";
	}

	createIcon(){
		return $('<i class="fa fa-not-equal"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A !== B;
	}
});
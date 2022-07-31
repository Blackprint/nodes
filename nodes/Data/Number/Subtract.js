/**
 * Return substracted number (A - B)
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/Subtract",
class extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Number: Subtract";
	}

	createIcon(){
		return $('<i class="fa fa-minus"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A - B;
	}
});
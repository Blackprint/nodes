/**
 * Return the remaining of divided number with modulo (A % B)
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/Modulo",
class extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Number: Modulo";
	}

	createIcon(){
		return $('<i class="fa fa-percentage"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A % B;
	}
});
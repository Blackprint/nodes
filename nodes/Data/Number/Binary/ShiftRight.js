/**
 * Shift bits of a number from left to the right, modulo 32.
 * Excess bits shifted off to the right are discarded.
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/Binary/ShiftRight",
class extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Binary: ShiftRight";
	}

	createIcon(){
		return $('<i class="fa fa-angle-double-right"></i>')[0];
	}

	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A >> B;
	}
});
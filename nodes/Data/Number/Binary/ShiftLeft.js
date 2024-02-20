/**
 * The left shift operator (<<) shifts the first operand the specified number of bits, modulo 32, to the left.
 * Excess bits shifted off to the left are discarded. Zero bits are shifted in from the right.
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/Binary/ShiftLeft",
class extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Binary: ShiftLeft";
	}

	createIcon(){
		return $('<i class="fa fa-angle-double-left"></i>')[0];
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A << B;
	}
});
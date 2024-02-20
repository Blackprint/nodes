/**
 * Apply bitwise XOR operator on number (A ^ B)
 * @blackprint node
 */
Blackprint.registerNode("Data/Number/Binary/Xor",
class extends Blackprint.Node {
	static input = { A: Number, B: Number };
	static output = { Value: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Binary: Xor";
		iface.w = 95;
	}

	createIcon(){
		return document.createTextNode('Bin Xor');
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Value = A ^ B;
	}
});
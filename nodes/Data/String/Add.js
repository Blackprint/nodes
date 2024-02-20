/**
 * Add string to string
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Add",
class extends Blackprint.Node {
	static input = { A: String, B: String };
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "String: Add";
	}

	createIcon(){
		return $('<i class="fa fa-plus"></i>')[0];
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let {A, B} = ref.Input;

		if(A == null || B == null) return;
		ref.Output.Result = A + B;
	}
});
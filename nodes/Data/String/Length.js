/**
 * Return length of a string
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Length",
class extends Blackprint.Node {
	static input = { String: String };
	static output = { Length: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "String: Length";
		iface.w = 95;
	}

	createIcon(){
		return document.createTextNode('Length');
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let { String } = ref.Input;

		if(String == null) return;
		ref.Output.Length = String.length;
	}
});
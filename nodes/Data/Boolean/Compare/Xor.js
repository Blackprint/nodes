/**
 * Compare boolean with XOR
 * This will only return `true` if the input is not similar
 * @blackprint node
 */
Blackprint.registerNode("Data/Boolean/Compare/Xor",
class extends Blackprint.Node {
	static input = { "0": Boolean, "1": Boolean };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Boolean: Xor";
	}

	createIcon(){
		return document.createTextNode('Xor');
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		ref.Output.Value = ref.Input["0"] !== ref.Input["1"];
	}
});
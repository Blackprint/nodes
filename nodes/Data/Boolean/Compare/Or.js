/**
 * Compare boolean with OR
 * This will only return `true` if one of the input is `true`
 * @blackprint node
 */
Blackprint.registerNode("Data/Boolean/Compare/Or",
class extends Blackprint.Node {
	static input = { "0": Boolean, "1": Boolean };
	static output = { Value: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Data/Minimal');
		iface.title = "Boolean: Or";
	}

	createIcon(){
		return document.createTextNode('Or');
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		ref.Output.Value = ref.Input["0"] || ref.Input["1"];
	}
});
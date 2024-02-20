/**
 * Get char from a string at index
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/CharAt",
class extends Blackprint.Node {
	static input = { String: String, Index: Number };
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Char At";
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let {String, Index} = ref.Input;

		if(String == null || Index == null) return;
		ref.Output.Result = String.charAt(Index);
	}
});
/**
 * Slice a string
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Slice",
class extends Blackprint.Node {
	static input = { String: String, Begin: Number, End: Number };
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Slice";
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let {String, Begin, End} = ref.Input;

		if(String == null || Begin == null) return;
		ref.Output.Result = String.slice(Begin, End);
	}
});
/**
 * Split a string and return an array
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Split",
class extends Blackprint.Node {
	static input = {
		String: String,
		Splitter: Blackprint.Port.Union([RegExp, String]),
	};
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Split";
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let {String, Splitter} = ref.Input;

		if(String == null || Splitter == null) return;
		ref.Output.Result = String.split(Splitter);
	}
});
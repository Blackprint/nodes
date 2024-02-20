/**
 * Convert string into RegExp
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/To/RegExp",
class Str2RegExp extends Blackprint.Node {
	static input = { In: String, Options: String };
	static output = { Out: RegExp };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "To RegExp";
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let { In, Options } = ref.Input;

		if(In == null) return;
		ref.Output.Out = RegExp(In, Options);
	}
});
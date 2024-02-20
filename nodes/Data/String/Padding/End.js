/**
 * Fill string with string (padding) on right (end)
 * if the text is less than specified length
 * @summary String
 * @blackprint node
 */
Blackprint.registerNode("Data/String/Padding/End",
class extends Blackprint.Node {
	static input = { A: String, Length: Number, Filler: String };
	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Padding End";
	}

	// Call update on init, but avoid call if it has route in or input
	static initUpdate = 0
		| Blackprint.InitUpdate.NoRouteIn
		| Blackprint.InitUpdate.NoInputCable;
	update(){
		let ref = this.ref;
		let {A, Length, Filler} = ref.Input;

		if(A == null || Length == null) return;
		ref.Output.Result = A.padEnd(Length, Filler);
	}
});
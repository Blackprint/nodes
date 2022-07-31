/**
 * Slice a string
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
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {String, Begin, End} = ref.Input;

		if(String == null || Begin == null) return;
		ref.Output.Result = String.slice(Begin, End);
	}
});
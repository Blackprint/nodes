/**
 * Split a string and return an array
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
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {String, Splitter} = ref.Input;

		if(String == null || Splitter == null) return;
		ref.Output.Result = String.split(Splitter);
	}
});
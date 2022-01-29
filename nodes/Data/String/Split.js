Blackprint.registerNode("Data/String/Split",
class EmptyNode extends Blackprint.Node {
	static input = { String: String, Splitter: String };
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
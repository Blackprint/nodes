Blackprint.registerNode("Data/String/Starts With",
class EmptyNode extends Blackprint.Node {
	static input = { Haystack: String, Needle: String };
	static output = { Result: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Starts With";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.Result = Haystack.startsWith(Needle);
	}
});
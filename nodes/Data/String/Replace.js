Blackprint.registerNode("Data/String/Replace",
class EmptyNode extends Blackprint.Node {
	static input = {
		Haystack: String,
		Needle: Blackprint.Port.Union([RegExp, String]),
		Replacement: String,
	};

	static output = { Result: String };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Replace";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle, Replacement} = ref.Input;

		if(Haystack == null || Needle == null || Replacement == null) return;
		ref.Output.Result = Haystack.replace(Needle, Replacement);
	}
});
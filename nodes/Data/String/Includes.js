Blackprint.registerNode("Data/String/Includes",
class EmptyNode extends Blackprint.Node {
	static input = { Haystack: String, Needle: String };
	static output = { IsExist: Boolean };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Includes";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.IsExist = Haystack.includes(Needle);
	}
});
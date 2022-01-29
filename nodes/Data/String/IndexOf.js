Blackprint.registerNode("Data/String/Index Of",
class EmptyNode extends Blackprint.Node {
	static input = { Haystack: String, Needle: String };
	static output = { Index: Number };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Index Of";
		iface.description = "String";
	}

	update(){
		let ref = this.ref;
		let {Haystack, Needle} = ref.Input;

		if(Haystack == null || Needle == null) return;
		ref.Output.Index = Haystack.indexOf(Needle);
	}
});